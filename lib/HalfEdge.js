import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import Vertex from './Vertex';

export default class HalfEdge {
  /**
   * 
   * @param {Vertex} vertex 
   * @param {*} face 
   */
  constructor (vertex, face) {
    this.vertex = vertex
    this.face = face
    this.next = null
    this.prev = null
    this.opposite = null
  }

  head () {
    return this.vertex
  }

  /**
   * 
   * @returns {Vertex | null}
   */
  tail () {
    return this.prev
      ? this.prev.vertex
      : null
  }

  length () {
    if (this.tail()) {
      return Vector3.Distance(
        this.tail().point,
        this.head().point
      )
    }
    return -1
  }

  lengthSquared () {
    if (this.tail()) {
      return Vector3.DistanceSquared(
        this.tail().point,
        this.head().point
      )
    }
    return -1
  }

  setOpposite (edge) {
    const me = this
    this.opposite = edge
    edge.opposite = this
  }
}
