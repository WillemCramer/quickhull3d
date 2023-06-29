/* eslint-env jest */

import assert from "../node_modules/assert";
import qh, { isPointInsideHull } from "../lib/index.js";
import QuickHull from "../lib/QuickHull.js";
import { getPlaneNormal } from "../lib/Math.js";
import { Vector3, Vector4 } from "../node_modules/@babylonjs/core/Maths/math.vector";





const EPS = 1e-6;
function equalEps(a, b) {
    const assertion = Math.abs(a - b) < EPS;
    expect(assertion).toBe(true);
}


const map = ["x", "y", "z", "w"];


test("case: box (without triangulation)", function () {
    const points = [
        [0, 0, 0],
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, 0],
        [1, 0, 1],
        [0, 1, 1],
        [1, 1, 1],
    ].map((p) => new Vector3(...p));
    const faces = qh(points, { skipTriangulation: true });

    console.log("Points:", points);
    console.log("Faces:", faces);

    expect(faces.length).toBe(6);
    equalIndexes(
        faces,
        [
            [6, 2, 0, 3],
            [1, 4, 7, 5],
            [6, 7, 4, 2],
            [3, 0, 1, 5],
            [5, 7, 6, 3],
            [0, 2, 4, 1],
        ].map((p) => new Vector4(...p))
    );
});
