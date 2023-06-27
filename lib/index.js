import QuickHull from "./QuickHull";
import { getPlaneNormal } from "./Math";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";

export default function runner(points, options = {}) {
  const instance = new QuickHull(points);
  instance.build();
  return instance.collectFaces(options.skipTriangulation);
}

/**
 * Checks if a point is inside the convex hull.
 *
 * @param {Array<Vector3>} point - The point to check.
 * @param {Array<Array<Vector3>>} points - The points used in the space where the
 * convex hull is defined.
 * @param {Array<Vector3>} faces - The faces of the convex hull.
 */
export function isPointInsideHull(point, points, faces) {
  for (let i = 0; i < faces.length; i++) {
    const face = faces[i];
    const a = points[face.x];
    const b = points[face.y];
    const c = points[face.z];

    // Algorithm:
    // 1. Get the normal of the face.
    // 2. Get the vector from the point to the first vertex of the face.
    // 3. Calculate the dot product of the normal and the vector.
    // 4. If the dot product is positive, the point is outside the face.

    const planeNormal = getPlaneNormal(a, b, c);

    // Get the point with respect to the first vertex of the face.
    const pointAbsA = point.subtract(a);

    const dotProduct =
      planeNormal.x * pointAbsA.x +
      planeNormal.y * pointAbsA.y +
      planeNormal.z * pointAbsA.z;

    if (dotProduct > 0) {
      return false;
    }
  }
  return true;
}
