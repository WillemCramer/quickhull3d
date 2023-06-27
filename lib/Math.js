import { Vector3 } from "@babylonjs/core/Maths/math.vector";

/**
 *
 * @param {Vector3} p
 * @param {Vector3} a
 * @param {Vector3} b
 * @returns
 */
export function pointLineDistance(p, a, b) {
  if(!p.subtract) {
    p = new Vector3(p[0], p[1], p[2]);
    throw new Error("p is not a Vector3");
  }
  const ab = b.subtract(a);
  const pa = p.subtract(a);
  const area = Vector3.Cross(pa, ab).lengthSquared();
  if (area === 0) {
    throw new Error("Zero length vector");
  }
  return Math.sqrt(area / ab.lengthSquared());
}

/**
 *
 * @param {Vector3} a
 * @param {Vector3} b
 * @param {Vector3} c
 * @returns {Vector3}
 */
export function getPlaneNormal(a, b, c) {
  const ab = a.subtract(b);
  const ac = b.subtract(c);
  const normal = Vector3.Cross(ab, ac);
  normal.normalize();
  return normal;
}
