/**
 * Position represents a point or coordinate
 */
export interface Position {
    pos2(): [x: number, y: number];
    setPos2(x: number, y: number);
    pos3(): [x: number, y: number, z: number];
    setPos3(x: number, y: number, z: number);
    x(x?: number): number;
    y(y?: number): number;
    z(z?: number): number;
    xy(x?: number, y?: number): [x: number, y: number];
    yz(y?: number, z?: number): [y: number, z: number];
    xz(x?: number, z?: number): [x: number, z: number];
    xyz(x?: number, y?: number, z?: number): [x: number, y: number, z: number];
    /** @deprecated use pos2() or xy() instead */
    vec2(): [x: number, y: number];
    /** @deprecated use setPos2() or xy() instead */
    setVec2(x: number, y: number);
    /** @deprecated use pos3() or xyz() instead */
    vec3(): [x: number, y: number, z: number];
    /** @deprecated use setPos3() or xyz() instead */
    setPos3(x: number, y: number, z: number);
}

export class Point {
    protected X: number = 0;
    protected Y: number = 0;
    protected Z: number = 0;

    /** @deprecated use pos2() or xy() instead */
    vec2 = this.pos2;
    /** @deprecated use setPos2() or xy() instead */
    setVec2 = this.setPos2;
    /** @deprecated use pos3() or xyz() instead */
    vec3 = this.pos3;
    /** @deprecated use setPos3() or xyz() instead */
    setVec3 = this.setPos3;
    /** pos2 returns the x and y components of the point */
    pos2(): [x: number, y: number] {
        return [this.X, this.Y];
    }
    /** pos3 returns all components of the point (x, y, z) */
    pos3(): [x: number, y: number, z: number] {
        return [this.X, this.Y, this.Z];
    }
    /** setPos2 sets the x and y components of the point */
    setPos2(x: number, y: number) {
        this.X = x;
        this.Y = y;
    }
    /** setPos3 sets the x, y, z components of the point */
    setPos3(x: number, y: number, z: number) {
        this.X = x;
        this.Y = y;
        this.Z = z;
    }
    /** Gets and/or sets the x position of the point */
    x(x?: number): number {
        if (typeof x === 'number') this.X = x;
        return this.X;
    }
    /** Gets and/or sets the y position of the point */
    y(y?: number): number {
        if (typeof y === 'number') this.Y = y;
        return this.Y;
    }
    /** Gets and/or sets the z position of the point */
    z(z?: number): number {
        if (typeof z === 'number') this.Z = z;
        return this.Z;
    }
    /** Gets and/or sets the x,y positions of the point */
    xy(x?: number, y?: number): [x: number, y: number] {
        return [this.x(x), this.y(y)];
    }
    /** Gets and/or sets the y,z positions of the point */
    yz(y?: number, z?: number): [y: number, z: number] {
        return [this.y(y), this.z(z)];
    }
    /** Gets and/or sets the x,z positions of the point */
    xz(x?: number, z?: number): [x: number, z: number] {
        return [this.x(x), this.z(z)];
    }
    /** Gets and/or sets the x,y,z positions of the point */
    xyz(x?: number, y?: number, z?: number): [x: number, y: number, z: number] {
        return [this.x(x), this.y(y), this.z(z)];
    }
}