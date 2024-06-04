import { isSet } from './bit';
import { PhysicsBounds } from './bounds';
import { Bounds } from './types';

interface PhysicsEntity extends PhysicsBounds {
    type(): number;
    collision(): number;
}

interface PhysicsCollider extends Bounds {
    type(): number;
}

export class PhysicsSimulator {
    entities: PhysicsEntity[] = [];
    colliders: PhysicsCollider[] = [];

    addEntity(entity: PhysicsEntity) {
        if (!this.entities.includes(entity)) {
            this.entities.push(entity);
        }
    }

    removeEntity(entity: PhysicsEntity) {
        if (this.entities.includes(entity)) {
            this.entities = this.entities.splice(this.entities.indexOf(entity), 1);
        }
    }

    addCollider(collider: PhysicsCollider) {
        if (!this.colliders.includes(collider)) {
            this.colliders.push(collider);
        }
    }

    removeCollider(collider: PhysicsCollider) {
        if (this.colliders.includes(collider)) {
            this.colliders = this.colliders.splice(this.colliders.indexOf(collider), 1);
        }
    }

    update(delta: number) {
        for (const entity of this.entities) {
            entity.update(delta);
            for (const collider of this.colliders) {
                if (isSet(entity.collision(), collider.type()) && entity.doesCollide(collider)) {
                    const [e1, e2] = entity.collisionEdges(collider);
                    const [vx, vy] = entity.velocity();
                    const [nx, ny] = collider.normalVectorOf(e2);
                    const [nvx, nvy] = reflectVelocity(vx, vy, nx, ny);
                    entity.setRawVelocity(nvx, nvy);
                    break;
                }
            }
        }
    }
}

function reflectVelocity(vx: number, vy: number, nx: number, ny: number) {
    const dotProduct = vx * nx + vy * ny;
    return [vx - 2 * dotProduct * nx, vy - 2 * dotProduct * ny];
}