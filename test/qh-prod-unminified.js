(() => {
    "use strict";
    class t {
        static WithinEpsilon(t, e, r = 1401298e-51) {
            return Math.abs(t - e) <= r
        }
        static ToHex(t) {
            const e = t.toString(16);
            return t <= 15
                ? ("0" + e).toUpperCase()
                : e.toUpperCase()
        }
        static Sign(t) {
            return 0 == (t =+ t) || isNaN(t)
                ? t
                : t > 0
                    ? 1
                    : -1
        }
        static Clamp(t, e = 0, r = 1) {
            return Math.min(r, Math.max(e, t))
        }
        static Log2(t) {
            return Math.log(t) * Math.LOG2E
        }
        static ILog2(t) {
            if (Math.log2) 
                return Math.floor(Math.log2(t));
            if (t < 0) 
                return NaN;
            if (0 === t) 
                return -1 / 0;
            let e = 0;
            if (t < 1) {
                for (; t < 1;) 
                    e++,
                    t *= 2;
                e = -e
            } else if (t > 1) 
                for (; t > 1;) 
                    e++,
                    t = Math.floor(t / 2);
        return e
        }
        static Repeat(t, e) {
            return t - Math.floor(t / e) * e
        }
        static Normalize(t, e, r) {
            return (t - e) / (r - e)
        }
        static Denormalize(t, e, r) {
            return t * (r - e) + e
        }
        static DeltaAngle(e, r) {
            let s = t.Repeat(r - e, 360);
            return s > 180 && (s -= 360),
            s
        }
        static PingPong(e, r) {
            const s = t.Repeat(e, 2 * r);
            return r - Math.abs(s - r)
        }
        static SmoothStep(e, r, s) {
            let i = t.Clamp(s);
            return i = -2 * i * i * i + 3 * i * i,
            r * i + e * (1 - i)
        }
        static MoveTowards(e, r, s) {
            let i = 0;
            return i = Math.abs(r - e) <= s
                ? r
                : e + t.Sign(r - e) * s,
            i
        }
        static MoveTowardsAngle(e, r, s) {
            const i = t.DeltaAngle(e, r);
            let o = 0;
            return -s < i && i < s
                ? o = r
                : (r = e + i, o = t.MoveTowards(e, r, s)),
            o
        }
        static Lerp(t, e, r) {
            return t + (e - t) * r
        }
        static LerpAngle(e, r, s) {
            let i = t.Repeat(r - e, 360);
            return i > 180 && (i -= 360),
            e + i * t.Clamp(s)
        }
        static InverseLerp(e, r, s) {
            let i = 0;
            return i = e != r
                ? t.Clamp((s - e) / (r - e))
                : 0,
            i
        }
        static Hermite(t, e, r, s, i) {
            const o = i * i,
                n = i * o;
            return t * (2 * n - 3 * o + 1) + r * (-2 * n + 3 * o) + e * (n - 2 * o + i) + s * (n - o)
        }
        static Hermite1stDerivative(t, e, r, s, i) {
            const o = i * i;
            return 6 * (o - i) * t + (3 * o - 4 * i + 1) * e + 6 * (-o + i) * r + (3 * o - 2 * i) * s
        }
        static RandomRange(t, e) {
            return t === e
                ? t
                : Math.random() * (e - t) + t
        }
        static RangeToPercent(t, e, r) {
            return (t - e) / (r - e)
        }
        static PercentToRange(t, e, r) {
            return (r - e) * t + e
        }
        static NormalizeRadians(e) {
            return e - t.TwoPi * Math.floor((e + Math.PI) / t.TwoPi)
        }
        static HCF(e, r) {
            const s = e % r;
            return 0 === s
                ? r
                : t.HCF(r, s)
        }
    }
    t.TwoPi = 2 * Math.PI,
    Math.sqrt(5);
    const e = .001;
    class r {
        static BuildArray(t, e) {
            const r = [];
            for (let s = 0; s < t; ++s) 
                r.push(e());
            return r
        }
        static BuildTuple(t, e) {
            return r.BuildArray(t, e)
        }
    }
    const s = {};
    function i(t, e) {
        s[t] = e
    }
    class o {
        static SetMatrixPrecision(t) {
            if (o.MatrixTrackPrecisionChange = !1, t && !o.MatrixUse64Bits && o.MatrixTrackedMatrices) 
                for (let t = 0; t < o.MatrixTrackedMatrices.length; ++t) {
                    const e = o.MatrixTrackedMatrices[t],
                        r = e._m;
                    e._m = new Array(16);
                    for (let t = 0; t < 16; ++t) 
                        e._m[t] = r[t]
                }
            o.MatrixUse64Bits = t,
            o.MatrixCurrentType = o.MatrixUse64Bits
                ? Array
                : Float32Array,
            o.MatrixTrackedMatrices = null
        }
    }
    o.MatrixUse64Bits = !1,
    o.MatrixTrackPrecisionChange = !0,
    o.MatrixCurrentType = Float32Array,
    o.MatrixTrackedMatrices = [];
    class n {
        constructor(t, e = !1, r, s) {
            this.initialize(t, e, r, s)
        }
        initialize(t, e = !1, r, s) {
            return this.mask = t,
            this.skipNextObservers = e,
            this.target = r,
            this.currentTarget = s,
            this
        }
    }
    class a {
        constructor(t, e, r = null) {
            this.callback = t,
            this.mask = e,
            this.scope = r,
            this._willBeUnregistered = !1,
            this.unregisterOnNextCall = !1,
            this._remove = null
        }
        remove() {
            this._remove && this._remove()
        }
    }
    class h {
        static FromPromise(t, e) {
            const r = new h;
            return t.then((t => {
                r.notifyObservers(t)
            })).catch((t => {
                if (!e) 
                    throw t;
                e.notifyObservers(t)
            })),
            r
        }
        get observers() {
            return this._observers
        }
        constructor(t, e = !1) {
            this.notifyIfTriggered = e,
            this._observers = new Array,
            this._numObserversMarkedAsDeleted = 0,
            this._hasNotified = !1,
            this._eventState = new n(0),
            t && (this._onObserverAdded = t)
        }
        add(t, e = -1, r = !1, s = null, i = !1) {
            if (!t) 
                return null;
            const o = new a(t, e, s);
            return o.unregisterOnNextCall = i,
            r
                ? this
                    ._observers
                    .unshift(o)
                : this
                    ._observers
                    .push(o),
            this._onObserverAdded && this._onObserverAdded(o),
            this._hasNotified && this.notifyIfTriggered && void 0 !== this._lastNotifiedValue && this.notifyObserver(o, this._lastNotifiedValue),
            o._remove = () => {
                this.remove(o)
            },
            o
        }
        addOnce(t) {
            return this.add(t, void 0, void 0, void 0, !0)
        }
        remove(t) {
            return !!t && (t._remove = null, -1 !== this._observers.indexOf(t) && (this._deferUnregister(t), !0))
        }
        removeCallback(t, e) {
            for (let r = 0; r < this._observers.length; r++) {
                const s = this._observers[r];
                if (!(s._willBeUnregistered || s.callback !== t || e && e !== s.scope)) 
                    return this._deferUnregister(s),
                    !0
            }
            return !1
        }
        _deferUnregister(t) {
            t._willBeUnregistered || (this._numObserversMarkedAsDeleted++, t.unregisterOnNextCall = !1, t._willBeUnregistered = !0, setTimeout((() => {
                this._remove(t)
            }), 0))
        }
        _remove(t, e = !0) {
            if (!t) 
                return !1;
            const r = this
                ._observers
                .indexOf(t);
            return -1 !== r && (e && this._numObserversMarkedAsDeleted--, this._observers.splice(r, 1), !0)
        }
        makeObserverTopPriority(t) {
            this._remove(t, !1),
            this
                ._observers
                .unshift(t)
        }
        makeObserverBottomPriority(t) {
            this._remove(t, !1),
            this
                ._observers
                .push(t)
        }
        notifyObservers(t, e = -1, r, s, i) {
            if (this.notifyIfTriggered && (this._hasNotified = !0, this._lastNotifiedValue = t), !this._observers.length) 
                return !0;
            const o = this._eventState;
            o.mask = e,
            o.target = r,
            o.currentTarget = s,
            o.skipNextObservers = !1,
            o.lastReturnValue = t,
            o.userInfo = i;
            for (const r of this._observers) 
                if (!r._willBeUnregistered && (r.mask & e && (r.unregisterOnNextCall && this._deferUnregister(r), r.scope
                    ? o.lastReturnValue = r.callback.apply(r.scope, [t, o])
                    : o.lastReturnValue = r.callback(t, o)), o.skipNextObservers)) 
                    return !1;
        return !0
        }
        notifyObserver(t, e, r = -1) {
            if (this.notifyIfTriggered && (this._hasNotified = !0, this._lastNotifiedValue = e), t._willBeUnregistered) 
                return;
            const s = this._eventState;
            s.mask = r,
            s.skipNextObservers = !1,
            t.unregisterOnNextCall && this._deferUnregister(t),
            t.callback(e, s)
        }
        hasObservers() {
            return this._observers.length - this._numObserversMarkedAsDeleted > 0
        }
        clear() {
            for (; this._observers.length;) {
                const t = this
                    ._observers
                    .pop();
                t && (t._remove = null)
            }
            this._onObserverAdded = null,
            this._numObserversMarkedAsDeleted = 0,
            this.cleanLastNotifiedState()
        }
        cleanLastNotifiedState() {
            this._hasNotified = !1,
            this._lastNotifiedValue = void 0
        }
        clone() {
            const t = new h;
            return t._observers = this
                ._observers
                .slice(0),
            t
        }
        hasSpecificMask(t = -1) {
            for (const e of this._observers) 
                if (e.mask & t || e.mask === t) 
                    return !0;
        return !1
        }
    }
    class c {
        static get LastCreatedEngine() {
            return 0 === this.Instances.length
                ? null
                : this.Instances[this.Instances.length - 1]
        }
        static get LastCreatedScene() {
            return this._LastCreatedScene
        }
    }
    c.Instances = new Array,
    c.OnEnginesDisposedObservable = new h,
    c._LastCreatedScene = null,
    c.UseFallbackTexture = !0,
    c.FallbackTexture = "";
    const _ = t => parseInt(t.toString().replace(/\W/g, ""));
    class u {
        constructor(t = 0, e = 0) {
            this.x = t,
            this.y = e
        }
        toString() {
            return `{X: ${this.x} Y: ${this.y}}`
        }
        getClassName() {
            return "Vector2"
        }
        getHashCode() {
            let t = _(this.x);
            return t = 397 * t ^ _(this.y),
            t
        }
        toArray(t, e = 0) {
            return t[e] = this.x,
            t[e + 1] = this.y,
            this
        }
        fromArray(t, e = 0) {
            return u.FromArrayToRef(t, e, this),
            this
        }
        asArray() {
            const t = new Array;
            return this.toArray(t, 0),
            t
        }
        copyFrom(t) {
            return this.x = t.x,
            this.y = t.y,
            this
        }
        copyFromFloats(t, e) {
            return this.x = t,
            this.y = e,
            this
        }
        set(t, e) {
            return this.copyFromFloats(t, e)
        }
        add(t) {
            return new this.constructor(this.x + t.x, this.y + t.y)
        }
        addToRef(t, e) {
            return e.x = this.x + t.x,
            e.y = this.y + t.y,
            e
        }
        addInPlace(t) {
            return this.x += t.x,
            this.y += t.y,
            this
        }
        addVector3(t) {
            return new this.constructor(this.x + t.x, this.y + t.y)
        }
        subtract(t) {
            return new this.constructor(this.x - t.x, this.y - t.y)
        }
        subtractToRef(t, e) {
            return e.x = this.x - t.x,
            e.y = this.y - t.y,
            e
        }
        subtractInPlace(t) {
            return this.x -= t.x,
            this.y -= t.y,
            this
        }
        multiplyInPlace(t) {
            return this.x *= t.x,
            this.y *= t.y,
            this
        }
        multiply(t) {
            return new this.constructor(this.x * t.x, this.y * t.y)
        }
        multiplyToRef(t, e) {
            return e.x = this.x * t.x,
            e.y = this.y * t.y,
            e
        }
        multiplyByFloats(t, e) {
            return new this.constructor(this.x * t, this.y * e)
        }
        divide(t) {
            return new this.constructor(this.x / t.x, this.y / t.y)
        }
        divideToRef(t, e) {
            return e.x = this.x / t.x,
            e.y = this.y / t.y,
            e
        }
        divideInPlace(t) {
            return this.divideToRef(t, this)
        }
        negate() {
            return new this.constructor(-this.x, -this.y)
        }
        negateInPlace() {
            return this.x *= -1,
            this.y *= -1,
            this
        }
        negateToRef(t) {
            return t.copyFromFloats(-1 * this.x, -1 * this.y)
        }
        scaleInPlace(t) {
            return this.x *= t,
            this.y *= t,
            this
        }
        scale(t) {
            const e = new this.constructor(0, 0);
            return this.scaleToRef(t, e),
            e
        }
        scaleToRef(t, e) {
            return e.x = this.x * t,
            e.y = this.y * t,
            e
        }
        scaleAndAddToRef(t, e) {
            return e.x += this.x * t,
            e.y += this.y * t,
            e
        }
        equals(t) {
            return t && this.x === t.x && this.y === t.y
        }
        equalsWithEpsilon(e, r = .001) {
            return e && t.WithinEpsilon(this.x, e.x, r) && t.WithinEpsilon(this.y, e.y, r)
        }
        floor() {
            return new this.constructor(Math.floor(this.x), Math.floor(this.y))
        }
        fract() {
            return new this.constructor(this.x - Math.floor(this.x), this.y - Math.floor(this.y))
        }
        rotateToRef(t, e) {
            const r = Math.cos(t),
                s = Math.sin(t),
                i = r * this.x - s * this.y,
                o = s * this.x + r * this.y;
            return e.x = i,
            e.y = o,
            e
        }
        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y)
        }
        lengthSquared() {
            return this.x * this.x + this.y * this.y
        }
        normalize() {
            return u.NormalizeToRef(this, this),
            this
        }
        clone() {
            return new this.constructor(this.x, this.y)
        }
        static Zero() {
            return new u(0, 0)
        }
        static One() {
            return new u(1, 1)
        }
        static Random(e = 0, r = 1) {
            return new u(t.RandomRange(e, r), t.RandomRange(e, r))
        }
        static get ZeroReadOnly() {
            return u._ZeroReadOnly
        }
        static FromArray(t, e = 0) {
            return new u(t[e], t[e + 1])
        }
        static FromArrayToRef(t, e, r) {
            return r.x = t[e],
            r.y = t[e + 1],
            r
        }
        static CatmullRom(t, e, r, s, i) {
            const o = i * i,
                n = i * o,
                a = .5 * (2 * e.x + (-t.x + r.x) * i + (2 * t.x - 5 * e.x + 4 * r.x - s.x) * o + (-t.x + 3 * e.x - 3 * r.x + s.x) * n),
                h = .5 * (2 * e.y + (-t.y + r.y) * i + (2 * t.y - 5 * e.y + 4 * r.y - s.y) * o + (-t.y + 3 * e.y - 3 * r.y + s.y) * n);
            return new t.constructor(a, h)
        }
        static Clamp(t, e, r) {
            let s = t.x;
            s = s > r.x
                ? r.x
                : s,
            s = s < e.x
                ? e.x
                : s;
            let i = t.y;
            return i = i > r.y
                ? r.y
                : i,
            i = i < e.y
                ? e.y
                : i,
            new t.constructor(s, i)
        }
        static Hermite(t, e, r, s, i) {
            const o = i * i,
                n = i * o,
                a = 2 * n - 3 * o + 1,
                h = -2 * n + 3 * o,
                c = n - 2 * o + i,
                _ = n - o,
                u = t.x * a + r.x * h + e.x * c + s.x * _,
                l = t.y * a + r.y * h + e.y * c + s.y * _;
            return new t.constructor(u, l)
        }
        static Hermite1stDerivative(t, e, r, s, i) {
            const o = new t.constructor;
            return this.Hermite1stDerivativeToRef(t, e, r, s, i, o),
            o
        }
        static Hermite1stDerivativeToRef(t, e, r, s, i, o) {
            const n = i * i;
            return o.x = 6 * (n - i) * t.x + (3 * n - 4 * i + 1) * e.x + 6 * (-n + i) * r.x + (3 * n - 2 * i) * s.x,
            o.y = 6 * (n - i) * t.y + (3 * n - 4 * i + 1) * e.y + 6 * (-n + i) * r.y + (3 * n - 2 * i) * s.y,
            o
        }
        static Lerp(t, e, r) {
            const s = t.x + (e.x - t.x) * r,
                i = t.y + (e.y - t.y) * r;
            return new t.constructor(s, i)
        }
        static Dot(t, e) {
            return t.x * e.x + t.y * e.y
        }
        static Normalize(t) {
            const e = new t.constructor;
            return this.NormalizeToRef(t, e),
            e
        }
        static NormalizeToRef(t, e) {
            const r = t.length();
            return 0 === r || (e.x = t.x / r, e.y = t.y / r),
            e
        }
        static Minimize(t, e) {
            const r = t.x < e.x
                    ? t.x
                    : e.x,
                s = t.y < e.y
                    ? t.y
                    : e.y;
            return new t.constructor(r, s)
        }
        static Maximize(t, e) {
            const r = t.x > e.x
                    ? t.x
                    : e.x,
                s = t.y > e.y
                    ? t.y
                    : e.y;
            return new t.constructor(r, s)
        }
        static Transform(t, e) {
            const r = new t.constructor;
            return u.TransformToRef(t, e, r),
            r
        }
        static TransformToRef(t, e, r) {
            const s = e.m,
                i = t.x * s[0] + t.y * s[4] + s[12],
                o = t.x * s[1] + t.y * s[5] + s[13];
            return r.x = i,
            r.y = o,
            r
        }
        static PointInTriangle(t, e, r, s) {
            const i = .5 * (-r.y * s.x + e.y * (-r.x + s.x) + e.x * (r.y - s.y) + r.x * s.y),
                o = i < 0
                    ? -1
                    : 1,
                n = (e.y * s.x - e.x * s.y + (s.y - e.y) * t.x + (e.x - s.x) * t.y) * o,
                a = (e.x * r.y - e.y * r.x + (e.y - r.y) * t.x + (r.x - e.x) * t.y) * o;
            return n > 0 && a > 0 && n + a < 2 * i * o
        }
        static Distance(t, e) {
            return Math.sqrt(u.DistanceSquared(t, e))
        }
        static DistanceSquared(t, e) {
            const r = t.x - e.x,
                s = t.y - e.y;
            return r * r + s * s
        }
        static Center(t, e) {
            const r = new t.constructor;
            return u.CenterToRef(t, e, r)
        }
        static CenterToRef(t, e, r) {
            return r.copyFromFloats((t.x + e.x) / 2, (t.y + e.y) / 2)
        }
        static DistanceOfPointFromSegment(t, e, r) {
            const s = u.DistanceSquared(e, r);
            if (0 === s) 
                return u.Distance(t, e);
            const i = r.subtract(e),
                o = Math.max(0, Math.min(1, u.Dot(t.subtract(e), i) / s)),
                n = e.add(i.multiplyByFloats(o, o));
            return u.Distance(t, n)
        }
    }
    u._ZeroReadOnly = u.Zero();
    class l {
        get x() {
            return this._x
        }
        set x(t) {
            this._x = t,
            this._isDirty = !0
        }
        get y() {
            return this._y
        }
        set y(t) {
            this._y = t,
            this._isDirty = !0
        }
        get z() {
            return this._z
        }
        set z(t) {
            this._z = t,
            this._isDirty = !0
        }
        constructor(t = 0, e = 0, r = 0) {
            this._isDirty = !0,
            this._x = t,
            this._y = e,
            this._z = r
        }
        toString() {
            return `{X: ${this._x} Y: ${this._y} Z: ${this._z}}`
        }
        getClassName() {
            return "Vector3"
        }
        getHashCode() {
            let t = _(this._x);
            return t = 397 * t ^ _(this._y),
            t = 397 * t ^ _(this._z),
            t
        }
        asArray() {
            const t = [];
            return this.toArray(t, 0),
            t
        }
        toArray(t, e = 0) {
            return t[e] = this._x,
            t[e + 1] = this._y,
            t[e + 2] = this._z,
            this
        }
        fromArray(t, e = 0) {
            return l.FromArrayToRef(t, e, this),
            this
        }
        toQuaternion() {
            return m.RotationYawPitchRoll(this._y, this._x, this._z)
        }
        addInPlace(t) {
            return this.addInPlaceFromFloats(t._x, t._y, t._z)
        }
        addInPlaceFromFloats(t, e, r) {
            return this._x += t,
            this._y += e,
            this._z += r,
            this._isDirty = !0,
            this
        }
        add(t) {
            return new this.constructor(this._x + t._x, this._y + t._y, this._z + t._z)
        }
        addToRef(t, e) {
            return e.copyFromFloats(this._x + t._x, this._y + t._y, this._z + t._z)
        }
        subtractInPlace(t) {
            return this._x -= t._x,
            this._y -= t._y,
            this._z -= t._z,
            this._isDirty = !0,
            this
        }
        subtract(t) {
            return new this.constructor(this._x - t._x, this._y - t._y, this._z - t._z)
        }
        subtractToRef(t, e) {
            return this.subtractFromFloatsToRef(t._x, t._y, t._z, e)
        }
        subtractFromFloats(t, e, r) {
            return new this.constructor(this._x - t, this._y - e, this._z - r)
        }
        subtractFromFloatsToRef(t, e, r, s) {
            return s.copyFromFloats(this._x - t, this._y - e, this._z - r)
        }
        negate() {
            return new this.constructor(-this._x, -this._y, -this._z)
        }
        negateInPlace() {
            return this._x *= -1,
            this._y *= -1,
            this._z *= -1,
            this._isDirty = !0,
            this
        }
        negateToRef(t) {
            return t.copyFromFloats(-1 * this._x, -1 * this._y, -1 * this._z)
        }
        scaleInPlace(t) {
            return this._x *= t,
            this._y *= t,
            this._z *= t,
            this._isDirty = !0,
            this
        }
        scale(t) {
            return new this.constructor(this._x * t, this._y * t, this._z * t)
        }
        scaleToRef(t, e) {
            return e.copyFromFloats(this._x * t, this._y * t, this._z * t)
        }
        getNormalToRef(t) {
            const e = this.length();
            let r = Math.acos(this.y / e);
            const s = Math.atan2(this.z, this.x);
            r > Math.PI / 2
                ? r -= Math.PI / 2
                : r += Math.PI / 2;
            const i = e * Math.sin(r) * Math.cos(s),
                o = e * Math.cos(r),
                n = e * Math.sin(r) * Math.sin(s);
            return t.set(i, o, n),
            t
        }
        applyRotationQuaternionToRef(t, e) {
            const r = t._w * this._x + t._y * this._z - t._z * this._y,
                s = t._w * this._y + t._z * this._x - t._x * this._z,
                i = t._w * this._z + t._x * this._y - t._y * this._x,
                o = -t._x * this._x - t._y * this._y - t._z * this._z;
            return e._x = r * t._w + o * -t._x + s * -t._z - i * -t._y,
            e._y = s * t._w + o * -t._y + i * -t._x - r * -t._z,
            e._z = i * t._w + o * -t._z + r * -t._y - s * -t._x,
            e._isDirty = !0,
            e
        }
        applyRotationQuaternionInPlace(t) {
            return this.applyRotationQuaternionToRef(t, this)
        }
        applyRotationQuaternion(t) {
            return this.applyRotationQuaternionToRef(t, new this.constructor)
        }
        scaleAndAddToRef(t, e) {
            return e.addInPlaceFromFloats(this._x * t, this._y * t, this._z * t)
        }
        projectOnPlane(t, e) {
            const r = new this.constructor;
            return this.projectOnPlaneToRef(t, e, r),
            r
        }
        projectOnPlaneToRef(t, e, r) {
            const s = t.normal,
                i = t.d,
                o = f.Vector3[0];
            this.subtractToRef(e, o),
            o.normalize();
            const n = l.Dot(o, s);
            if (Math.abs(n) < Math.pow(10, -10)) 
                r.setAll(1 / 0);
            else {
                const t = -(l.Dot(e, s) + i) / n,
                    a = o.scaleInPlace(t);
                e.addToRef(a, r)
            }
            return r
        }
        equals(t) {
            return t && this._x === t._x && this._y === t._y && this._z === t._z
        }
        equalsWithEpsilon(e, r = .001) {
            return e && t.WithinEpsilon(this._x, e._x, r) && t.WithinEpsilon(this._y, e._y, r) && t.WithinEpsilon(this._z, e._z, r)
        }
        equalsToFloats(t, e, r) {
            return this._x === t && this._y === e && this._z === r
        }
        multiplyInPlace(t) {
            return this._x *= t._x,
            this._y *= t._y,
            this._z *= t._z,
            this._isDirty = !0,
            this
        }
        multiply(t) {
            return this.multiplyByFloats(t._x, t._y, t._z)
        }
        multiplyToRef(t, e) {
            return e.copyFromFloats(this._x * t._x, this._y * t._y, this._z * t._z)
        }
        multiplyByFloats(t, e, r) {
            return new this.constructor(this._x * t, this._y * e, this._z * r)
        }
        divide(t) {
            return new this.constructor(this._x / t._x, this._y / t._y, this._z / t._z)
        }
        divideToRef(t, e) {
            return e.copyFromFloats(this._x / t._x, this._y / t._y, this._z / t._z)
        }
        divideInPlace(t) {
            return this.divideToRef(t, this)
        }
        minimizeInPlace(t) {
            return this.minimizeInPlaceFromFloats(t._x, t._y, t._z)
        }
        maximizeInPlace(t) {
            return this.maximizeInPlaceFromFloats(t._x, t._y, t._z)
        }
        minimizeInPlaceFromFloats(t, e, r) {
            return t < this._x && (this.x = t),
            e < this._y && (this.y = e),
            r < this._z && (this.z = r),
            this
        }
        maximizeInPlaceFromFloats(t, e, r) {
            return t > this._x && (this.x = t),
            e > this._y && (this.y = e),
            r > this._z && (this.z = r),
            this
        }
        isNonUniformWithinEpsilon(e) {
            const r = Math.abs(this._x),
                s = Math.abs(this._y);
            if (!t.WithinEpsilon(r, s, e)) 
                return !0;
            const i = Math.abs(this._z);
            return !t.WithinEpsilon(r, i, e) || !t.WithinEpsilon(s, i, e)
        }
        get isNonUniform() {
            const t = Math.abs(this._x);
            return t !== Math.abs(this._y) || t !== Math.abs(this._z)
        }
        floor() {
            return new this.constructor(Math.floor(this._x), Math.floor(this._y), Math.floor(this._z))
        }
        fract() {
            return new this.constructor(this._x - Math.floor(this._x), this._y - Math.floor(this._y), this._z - Math.floor(this._z))
        }
        length() {
            return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z)
        }
        lengthSquared() {
            return this._x * this._x + this._y * this._y + this._z * this._z
        }
        get hasAZeroComponent() {
            return this._x * this._y * this._z == 0
        }
        normalize() {
            return this.normalizeFromLength(this.length())
        }
        reorderInPlace(t) {
            return "xyz" === (t = t.toLowerCase()) || (f.Vector3[0].copyFrom(this), ["x", "y", "z"].forEach(((e, r) => {
                this[e] = f.Vector3[0][t[r]]
            }))),
            this
        }
        rotateByQuaternionToRef(t, e) {
            return t.toRotationMatrix(f.Matrix[0]),
            l.TransformCoordinatesToRef(this, f.Matrix[0], e),
            e
        }
        rotateByQuaternionAroundPointToRef(t, e, r) {
            return this.subtractToRef(e, f.Vector3[0]),
            f
                .Vector3[0]
                .rotateByQuaternionToRef(t, f.Vector3[0]),
            e.addToRef(f.Vector3[0], r),
            r
        }
        cross(t) {
            const e = new this.constructor;
            return l.CrossToRef(this, t, e)
        }
        normalizeFromLength(t) {
            return 0 === t || 1 === t
                ? this
                : this.scaleInPlace(1 / t)
        }
        normalizeToNew() {
            const t = new this.constructor(0, 0, 0);
            return this.normalizeToRef(t),
            t
        }
        normalizeToRef(t) {
            const e = this.length();
            return 0 === e || 1 === e
                ? t.copyFromFloats(this._x, this._y, this._z)
                : this.scaleToRef(1 / e, t)
        }
        clone() {
            return new this.constructor(this._x, this._y, this._z)
        }
        copyFrom(t) {
            return this.copyFromFloats(t._x, t._y, t._z)
        }
        copyFromFloats(t, e, r) {
            return this._x = t,
            this._y = e,
            this._z = r,
            this._isDirty = !0,
            this
        }
        set(t, e, r) {
            return this.copyFromFloats(t, e, r)
        }
        setAll(t) {
            return this._x = this._y = this._z = t,
            this._isDirty = !0,
            this
        }
        static GetClipFactor(t, e, r, s) {
            const i = l.Dot(t, r) - s;
            return i / (i - (l.Dot(e, r) - s))
        }
        static GetAngleBetweenVectors(e, r, s) {
            const i = e.normalizeToRef(f.Vector3[1]),
                o = r.normalizeToRef(f.Vector3[2]);
            let n = l.Dot(i, o);
            n = t.Clamp(n, -1, 1);
            const a = Math.acos(n),
                h = f.Vector3[3];
            return l.CrossToRef(i, o, h),
            l.Dot(h, s) > 0
                ? isNaN(a)
                    ? 0
                    : a
                : isNaN(a)
                    ? -Math.PI
                    : -Math.acos(n)
        }
        static GetAngleBetweenVectorsOnPlane(e, r, s) {
            f
                .Vector3[0]
                .copyFrom(e);
            const i = f.Vector3[0];
            f
                .Vector3[1]
                .copyFrom(r);
            const o = f.Vector3[1];
            f
                .Vector3[2]
                .copyFrom(s);
            const n = f.Vector3[2],
                a = f.Vector3[3],
                h = f.Vector3[4];
            i.normalize(),
            o.normalize(),
            n.normalize(),
            l.CrossToRef(n, i, a),
            l.CrossToRef(a, n, h);
            const c = Math.atan2(l.Dot(o, a), l.Dot(o, h));
            return t.NormalizeRadians(c)
        }
        static PitchYawRollToMoveBetweenPointsToRef(t, e, r) {
            const s = R.Vector3[0];
            return e.subtractToRef(t, s),
            r._y = Math.atan2(s.x, s.z) || 0,
            r._x = Math.atan2(Math.sqrt(s.x ** 2 + s.z ** 2), s.y) || 0,
            r._z = 0,
            r._isDirty = !0,
            r
        }
        static PitchYawRollToMoveBetweenPoints(t, e) {
            const r = l.Zero();
            return l.PitchYawRollToMoveBetweenPointsToRef(t, e, r)
        }
        static SlerpToRef(e, r, s, i) {
            s = t.Clamp(s, 0, 1);
            const o = f.Vector3[0],
                n = f.Vector3[1];
            o.copyFrom(e);
            const a = o.length();
            o.normalizeFromLength(a),
            n.copyFrom(r);
            const h = n.length();
            n.normalizeFromLength(h);
            const c = l.Dot(o, n);
            let _,
                u;
            if (c < .999) {
                const t = Math.acos(c),
                    e = 1 / Math.sin(t);
                _ = Math.sin((1 - s) * t) * e,
                u = Math.sin(s * t) * e
            } else 
                _ = 1 - s,
                u = s;
            return o.scaleInPlace(_),
            n.scaleInPlace(u),
            i
                .copyFrom(o)
                .addInPlace(n),
            i.scaleInPlace(t.Lerp(a, h, s)),
            i
        }
        static SmoothToRef(t, e, r, s, i) {
            return l.SlerpToRef(t, e, 0 === s
                ? 1
                : r / s, i),
            i
        }
        static FromArray(t, e = 0) {
            return new l(t[e], t[e + 1], t[e + 2])
        }
        static FromFloatArray(t, e) {
            return l.FromArray(t, e)
        }
        static FromArrayToRef(t, e, r) {
            return r._x = t[e],
            r._y = t[e + 1],
            r._z = t[e + 2],
            r._isDirty = !0,
            r
        }
        static FromFloatArrayToRef(t, e, r) {
            return l.FromArrayToRef(t, e, r)
        }
        static FromFloatsToRef(t, e, r, s) {
            return s.copyFromFloats(t, e, r),
            s
        }
        static Zero() {
            return new l(0, 0, 0)
        }
        static One() {
            return new l(1, 1, 1)
        }
        static Up() {
            return new l(0, 1, 0)
        }
        static get UpReadOnly() {
            return l._UpReadOnly
        }
        static get DownReadOnly() {
            return l._DownReadOnly
        }
        static get RightReadOnly() {
            return l._RightReadOnly
        }
        static get LeftReadOnly() {
            return l._LeftReadOnly
        }
        static get LeftHandedForwardReadOnly() {
            return l._LeftHandedForwardReadOnly
        }
        static get RightHandedForwardReadOnly() {
            return l._RightHandedForwardReadOnly
        }
        static get LeftHandedBackwardReadOnly() {
            return l._LeftHandedBackwardReadOnly
        }
        static get RightHandedBackwardReadOnly() {
            return l._RightHandedBackwardReadOnly
        }
        static get ZeroReadOnly() {
            return l._ZeroReadOnly
        }
        static get OneReadOnly() {
            return l._OneReadOnly
        }
        static Down() {
            return new l(0, -1, 0)
        }
        static Forward(t = !1) {
            return new l(0, 0, t
                ? -1
                : 1)
        }
        static Backward(t = !1) {
            return new l(0, 0, t
                ? 1
                : -1)
        }
        static Right() {
            return new l(1, 0, 0)
        }
        static Left() {
            return new l(-1, 0, 0)
        }
        static Random(e = 0, r = 1) {
            return new l(t.RandomRange(e, r), t.RandomRange(e, r), t.RandomRange(e, r))
        }
        static TransformCoordinates(t, e) {
            const r = l.Zero();
            return l.TransformCoordinatesToRef(t, e, r),
            r
        }
        static TransformCoordinatesToRef(t, e, r) {
            return l.TransformCoordinatesFromFloatsToRef(t._x, t._y, t._z, e, r),
            r
        }
        static TransformCoordinatesFromFloatsToRef(t, e, r, s, i) {
            const o = s.m,
                n = t * o[0] + e * o[4] + r * o[8] + o[12],
                a = t * o[1] + e * o[5] + r * o[9] + o[13],
                h = t * o[2] + e * o[6] + r * o[10] + o[14],
                c = 1 / (t * o[3] + e * o[7] + r * o[11] + o[15]);
            return i._x = n * c,
            i._y = a * c,
            i._z = h * c,
            i._isDirty = !0,
            i
        }
        static TransformNormal(t, e) {
            const r = l.Zero();
            return l.TransformNormalToRef(t, e, r),
            r
        }
        static TransformNormalToRef(t, e, r) {
            return this.TransformNormalFromFloatsToRef(t._x, t._y, t._z, e, r),
            r
        }
        static TransformNormalFromFloatsToRef(t, e, r, s, i) {
            const o = s.m;
            return i._x = t * o[0] + e * o[4] + r * o[8],
            i._y = t * o[1] + e * o[5] + r * o[9],
            i._z = t * o[2] + e * o[6] + r * o[10],
            i._isDirty = !0,
            i
        }
        static CatmullRom(t, e, r, s, i) {
            const o = i * i,
                n = i * o,
                a = .5 * (2 * e._x + (-t._x + r._x) * i + (2 * t._x - 5 * e._x + 4 * r._x - s._x) * o + (-t._x + 3 * e._x - 3 * r._x + s._x) * n),
                h = .5 * (2 * e._y + (-t._y + r._y) * i + (2 * t._y - 5 * e._y + 4 * r._y - s._y) * o + (-t._y + 3 * e._y - 3 * r._y + s._y) * n),
                c = .5 * (2 * e._z + (-t._z + r._z) * i + (2 * t._z - 5 * e._z + 4 * r._z - s._z) * o + (-t._z + 3 * e._z - 3 * r._z + s._z) * n);
            return new t.constructor(a, h, c)
        }
        static Clamp(t, e, r) {
            const s = new t.constructor;
            return l.ClampToRef(t, e, r, s),
            s
        }
        static ClampToRef(t, e, r, s) {
            let i = t._x;
            i = i > r._x
                ? r._x
                : i,
            i = i < e._x
                ? e._x
                : i;
            let o = t._y;
            o = o > r._y
                ? r._y
                : o,
            o = o < e._y
                ? e._y
                : o;
            let n = t._z;
            return n = n > r._z
                ? r._z
                : n,
            n = n < e._z
                ? e._z
                : n,
            s.copyFromFloats(i, o, n),
            s
        }
        static CheckExtends(t, e, r) {
            e.minimizeInPlace(t),
            r.maximizeInPlace(t)
        }
        static Hermite(t, e, r, s, i) {
            const o = i * i,
                n = i * o,
                a = 2 * n - 3 * o + 1,
                h = -2 * n + 3 * o,
                c = n - 2 * o + i,
                _ = n - o,
                u = t._x * a + r._x * h + e._x * c + s._x * _,
                l = t._y * a + r._y * h + e._y * c + s._y * _,
                y = t._z * a + r._z * h + e._z * c + s._z * _;
            return new t.constructor(u, l, y)
        }
        static Hermite1stDerivative(t, e, r, s, i) {
            const o = new t.constructor;
            return this.Hermite1stDerivativeToRef(t, e, r, s, i, o),
            o
        }
        static Hermite1stDerivativeToRef(t, e, r, s, i, o) {
            const n = i * i;
            return o._x = 6 * (n - i) * t._x + (3 * n - 4 * i + 1) * e._x + 6 * (-n + i) * r._x + (3 * n - 2 * i) * s._x,
            o._y = 6 * (n - i) * t._y + (3 * n - 4 * i + 1) * e._y + 6 * (-n + i) * r._y + (3 * n - 2 * i) * s._y,
            o._z = 6 * (n - i) * t._z + (3 * n - 4 * i + 1) * e._z + 6 * (-n + i) * r._z + (3 * n - 2 * i) * s._z,
            o._isDirty = !0,
            o
        }
        static Lerp(t, e, r) {
            const s = new t.constructor(0, 0, 0);
            return l.LerpToRef(t, e, r, s),
            s
        }
        static LerpToRef(t, e, r, s) {
            return s._x = t._x + (e._x - t._x) * r,
            s._y = t._y + (e._y - t._y) * r,
            s._z = t._z + (e._z - t._z) * r,
            s._isDirty = !0,
            s
        }
        static Dot(t, e) {
            return t._x * e._x + t._y * e._y + t._z * e._z
        }
        static Cross(t, e) {
            const r = new t.constructor;
            return l.CrossToRef(t, e, r),
            r
        }
        static CrossToRef(t, e, r) {
            const s = t._y * e._z - t._z * e._y,
                i = t._z * e._x - t._x * e._z,
                o = t._x * e._y - t._y * e._x;
            return r.copyFromFloats(s, i, o),
            r
        }
        static Normalize(t) {
            const e = l.Zero();
            return l.NormalizeToRef(t, e),
            e
        }
        static NormalizeToRef(t, e) {
            return t.normalizeToRef(e),
            e
        }
        static Project(t, e, r, s) {
            const i = new t.constructor;
            return l.ProjectToRef(t, e, r, s, i),
            i
        }
        static ProjectToRef(t, e, r, s, i) {
            const o = s.width,
                n = s.height,
                a = s.x,
                h = s.y,
                c = f.Matrix[1];
            x.FromValuesToRef(o / 2, 0, 0, 0, 0, -n / 2, 0, 0, 0, 0, .5, 0, a + o / 2, n / 2 + h, .5, 1, c);
            const _ = f.Matrix[0];
            return e.multiplyToRef(r, _),
            _.multiplyToRef(c, _),
            l.TransformCoordinatesToRef(t, _, i),
            i
        }
        static Reflect(t, e) {
            return this.ReflectToRef(t, e, new l)
        }
        static ReflectToRef(t, e, r) {
            const s = R.Vector3[0];
            return s
                .copyFrom(e)
                .scaleInPlace(2 * l.Dot(t, e)),
            r
                .copyFrom(t)
                .subtractInPlace(s)
        }
        static _UnprojectFromInvertedMatrixToRef(e, r, s) {
            l.TransformCoordinatesToRef(e, r, s);
            const i = r.m,
                o = e._x * i[3] + e._y * i[7] + e._z * i[11] + i[15];
            return t.WithinEpsilon(o, 1) && s.scaleInPlace(1 / o),
            s
        }
        static UnprojectFromTransform(t, e, r, s, i) {
            return this.Unproject(t, e, r, s, i, x.IdentityReadOnly)
        }
        static Unproject(t, e, r, s, i, o) {
            const n = new t.constructor;
            return l.UnprojectToRef(t, e, r, s, i, o, n),
            n
        }
        static UnprojectToRef(t, e, r, s, i, o, n) {
            return l.UnprojectFloatsToRef(t._x, t._y, t._z, e, r, s, i, o, n),
            n
        }
        static UnprojectFloatsToRef(t, e, r, s, i, o, n, a, h) {
            var _;
            const u = f.Matrix[0];
            o.multiplyToRef(n, u),
            u.multiplyToRef(a, u),
            u.invert();
            const y = f.Vector3[0];
            return y.x = t / s * 2 - 1,
            y.y = -(e / i * 2 - 1),
            (null === (_ = c.LastCreatedEngine) || void 0 === _
                ? void 0
                : _.isNDCHalfZRange)
                ? y.z = r
                : y.z = 2 * r - 1,
            l._UnprojectFromInvertedMatrixToRef(y, u, h),
            h
        }
        static Minimize(t, e) {
            const r = new t.constructor;
            return r.copyFrom(t),
            r.minimizeInPlace(e),
            r
        }
        static Maximize(t, e) {
            const r = new t.constructor;
            return r.copyFrom(t),
            r.maximizeInPlace(e),
            r
        }
        static Distance(t, e) {
            return Math.sqrt(l.DistanceSquared(t, e))
        }
        static DistanceSquared(t, e) {
            const r = t._x - e._x,
                s = t._y - e._y,
                i = t._z - e._z;
            return r * r + s * s + i * i
        }
        static ProjectOnTriangleToRef(r, s, i, o, n) {
            const a = f.Vector3[0],
                h = f.Vector3[1],
                c = f.Vector3[2],
                _ = f.Vector3[3],
                u = f.Vector3[4];
            i.subtractToRef(s, a),
            o.subtractToRef(s, h),
            o.subtractToRef(i, c);
            const y = a.length(),
                m = h.length(),
                x = c.length();
            if (y < e || m < e || x < e) 
                return n.copyFrom(s),
                l.Distance(r, s);
            r.subtractToRef(s, u),
            l.CrossToRef(a, h, _);
            const R = _.length();
            if (R < e) 
                return n.copyFrom(s),
                l.Distance(r, s);
            _.normalizeFromLength(R);
            let d = u.length();
            if (d < e) 
                return n.copyFrom(s),
                0;
            u.normalizeFromLength(d);
            const z = l.Dot(_, u),
                T = f.Vector3[5],
                w = f.Vector3[6];
            T
                .copyFrom(_)
                .scaleInPlace(-d * z),
            w
                .copyFrom(r)
                .addInPlace(T);
            const p = f.Vector3[4],
                F = f.Vector3[5],
                M = f.Vector3[7],
                g = f.Vector3[8];
            p
                .copyFrom(a)
                .scaleInPlace(1 / y),
            g
                .copyFrom(h)
                .scaleInPlace(1 / m),
            p
                .addInPlace(g)
                .scaleInPlace(-1),
            F
                .copyFrom(a)
                .scaleInPlace(-1 / y),
            g
                .copyFrom(c)
                .scaleInPlace(1 / x),
            F
                .addInPlace(g)
                .scaleInPlace(-1),
            M
                .copyFrom(c)
                .scaleInPlace(-1 / x),
            g
                .copyFrom(h)
                .scaleInPlace(-1 / m),
            M
                .addInPlace(g)
                .scaleInPlace(-1);
            const I = f.Vector3[9];
            let A;
            I
                .copyFrom(w)
                .subtractInPlace(s),
            l.CrossToRef(p, I, g),
            A = l.Dot(g, _);
            const D = A;
            I
                .copyFrom(w)
                .subtractInPlace(i),
            l.CrossToRef(F, I, g),
            A = l.Dot(g, _);
            const P = A;
            I
                .copyFrom(w)
                .subtractInPlace(o),
            l.CrossToRef(M, I, g),
            A = l.Dot(g, _);
            const v = A,
                V = f.Vector3[10];
            let O,
                C;
            D > 0 && P < 0
                ? (V.copyFrom(a), O = s, C = i)
                : P > 0 && v < 0
                    ? (V.copyFrom(c), O = i, C = o)
                    : (V.copyFrom(h).scaleInPlace(-1), O = o, C = s);
            const b = f.Vector3[9],
                L = f.Vector3[4];
            if (O.subtractToRef(w, g), C.subtractToRef(w, b), l.CrossToRef(g, b, L), !(l.Dot(L, _) < 0)) 
                return n.copyFrom(w),
                Math.abs(d * z);
            const k = f.Vector3[5];
            l.CrossToRef(V, L, k),
            k.normalize();
            const H = f.Vector3[9];
            H
                .copyFrom(O)
                .subtractInPlace(w);
            const S = H.length();
            if (S < e) 
                return n.copyFrom(O),
                l.Distance(r, O);
            H.normalizeFromLength(S);
            const N = l.Dot(k, H),
                U = f.Vector3[7];
            U
                .copyFrom(w)
                .addInPlace(k.scaleInPlace(S * N)),
            g
                .copyFrom(U)
                .subtractInPlace(O),
            d = V.length(),
            V.normalizeFromLength(d);
            let B = l.Dot(g, V) / Math.max(d, e);
            return B = t.Clamp(B, 0, 1),
            U
                .copyFrom(O)
                .addInPlace(V.scaleInPlace(B * d)),
            n.copyFrom(U),
            l.Distance(r, U)
        }
        static Center(t, e) {
            return l.CenterToRef(t, e, l.Zero())
        }
        static CenterToRef(t, e, r) {
            return r.copyFromFloats((t._x + e._x) / 2, (t._y + e._y) / 2, (t._z + e._z) / 2)
        }
        static RotationFromAxis(t, e, r) {
            const s = new t.constructor;
            return l.RotationFromAxisToRef(t, e, r, s),
            s
        }
        static RotationFromAxisToRef(t, e, r, s) {
            const i = f.Quaternion[0];
            return m.RotationQuaternionFromAxisToRef(t, e, r, i),
            i.toEulerAnglesToRef(s),
            s
        }
    }
    l._UpReadOnly = l.Up(),
    l._DownReadOnly = l.Down(),
    l._LeftHandedForwardReadOnly = l.Forward(!1),
    l._RightHandedForwardReadOnly = l.Forward(!0),
    l._LeftHandedBackwardReadOnly = l.Backward(!1),
    l._RightHandedBackwardReadOnly = l.Backward(!0),
    l._RightReadOnly = l.Right(),
    l._LeftReadOnly = l.Left(),
    l._ZeroReadOnly = l.Zero(),
    l._OneReadOnly = l.One();
    class y {
        constructor(t = 0, e = 0, r = 0, s = 0) {
            this.x = t,
            this.y = e,
            this.z = r,
            this.w = s
        }
        toString() {
            return `{X: ${this.x} Y: ${this.y} Z: ${this.z} W: ${this.w}}`
        }
        getClassName() {
            return "Vector4"
        }
        getHashCode() {
            let t = _(this.x);
            return t = 397 * t ^ _(this.y),
            t = 397 * t ^ _(this.z),
            t = 397 * t ^ _(this.w),
            t
        }
        asArray() {
            const t = new Array;
            return this.toArray(t, 0),
            t
        }
        toArray(t, e) {
            return void 0 === e && (e = 0),
            t[e] = this.x,
            t[e + 1] = this.y,
            t[e + 2] = this.z,
            t[e + 3] = this.w,
            this
        }
        fromArray(t, e = 0) {
            return y.FromArrayToRef(t, e, this),
            this
        }
        addInPlace(t) {
            return this.x += t.x,
            this.y += t.y,
            this.z += t.z,
            this.w += t.w,
            this
        }
        add(t) {
            return new this.constructor(this.x + t.x, this.y + t.y, this.z + t.z, this.w + t.w)
        }
        addToRef(t, e) {
            return e.x = this.x + t.x,
            e.y = this.y + t.y,
            e.z = this.z + t.z,
            e.w = this.w + t.w,
            e
        }
        subtractInPlace(t) {
            return this.x -= t.x,
            this.y -= t.y,
            this.z -= t.z,
            this.w -= t.w,
            this
        }
        subtract(t) {
            return new this.constructor(this.x - t.x, this.y - t.y, this.z - t.z, this.w - t.w)
        }
        subtractToRef(t, e) {
            return e.x = this.x - t.x,
            e.y = this.y - t.y,
            e.z = this.z - t.z,
            e.w = this.w - t.w,
            e
        }
        subtractFromFloats(t, e, r, s) {
            return new this.constructor(this.x - t, this.y - e, this.z - r, this.w - s)
        }
        subtractFromFloatsToRef(t, e, r, s, i) {
            return i.x = this.x - t,
            i.y = this.y - e,
            i.z = this.z - r,
            i.w = this.w - s,
            i
        }
        negate() {
            return new this.constructor(-this.x, -this.y, -this.z, -this.w)
        }
        negateInPlace() {
            return this.x *= -1,
            this.y *= -1,
            this.z *= -1,
            this.w *= -1,
            this
        }
        negateToRef(t) {
            return t.copyFromFloats(-1 * this.x, -1 * this.y, -1 * this.z, -1 * this.w)
        }
        scaleInPlace(t) {
            return this.x *= t,
            this.y *= t,
            this.z *= t,
            this.w *= t,
            this
        }
        scale(t) {
            return new this.constructor(this.x * t, this.y * t, this.z * t, this.w * t)
        }
        scaleToRef(t, e) {
            return e.x = this.x * t,
            e.y = this.y * t,
            e.z = this.z * t,
            e.w = this.w * t,
            e
        }
        scaleAndAddToRef(t, e) {
            return e.x += this.x * t,
            e.y += this.y * t,
            e.z += this.z * t,
            e.w += this.w * t,
            e
        }
        equals(t) {
            return t && this.x === t.x && this.y === t.y && this.z === t.z && this.w === t.w
        }
        equalsWithEpsilon(e, r = .001) {
            return e && t.WithinEpsilon(this.x, e.x, r) && t.WithinEpsilon(this.y, e.y, r) && t.WithinEpsilon(this.z, e.z, r) && t.WithinEpsilon(this.w, e.w, r)
        }
        equalsToFloats(t, e, r, s) {
            return this.x === t && this.y === e && this.z === r && this.w === s
        }
        multiplyInPlace(t) {
            return this.x *= t.x,
            this.y *= t.y,
            this.z *= t.z,
            this.w *= t.w,
            this
        }
        multiply(t) {
            return new this.constructor(this.x * t.x, this.y * t.y, this.z * t.z, this.w * t.w)
        }
        multiplyToRef(t, e) {
            return e.x = this.x * t.x,
            e.y = this.y * t.y,
            e.z = this.z * t.z,
            e.w = this.w * t.w,
            e
        }
        multiplyByFloats(t, e, r, s) {
            return new this.constructor(this.x * t, this.y * e, this.z * r, this.w * s)
        }
        divide(t) {
            return new this.constructor(this.x / t.x, this.y / t.y, this.z / t.z, this.w / t.w)
        }
        divideToRef(t, e) {
            return e.x = this.x / t.x,
            e.y = this.y / t.y,
            e.z = this.z / t.z,
            e.w = this.w / t.w,
            e
        }
        divideInPlace(t) {
            return this.divideToRef(t, this)
        }
        minimizeInPlace(t) {
            return t.x < this.x && (this.x = t.x),
            t.y < this.y && (this.y = t.y),
            t.z < this.z && (this.z = t.z),
            t.w < this.w && (this.w = t.w),
            this
        }
        maximizeInPlace(t) {
            return t.x > this.x && (this.x = t.x),
            t.y > this.y && (this.y = t.y),
            t.z > this.z && (this.z = t.z),
            t.w > this.w && (this.w = t.w),
            this
        }
        floor() {
            return new this.constructor(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z), Math.floor(this.w))
        }
        fract() {
            return new this.constructor(this.x - Math.floor(this.x), this.y - Math.floor(this.y), this.z - Math.floor(this.z), this.w - Math.floor(this.w))
        }
        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
        }
        lengthSquared() {
            return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
        }
        normalize() {
            const t = this.length();
            return 0 === t
                ? this
                : this.scaleInPlace(1 / t)
        }
        toVector3() {
            return new l(this.x, this.y, this.z)
        }
        clone() {
            return new this.constructor(this.x, this.y, this.z, this.w)
        }
        copyFrom(t) {
            return this.x = t.x,
            this.y = t.y,
            this.z = t.z,
            this.w = t.w,
            this
        }
        copyFromFloats(t, e, r, s) {
            return this.x = t,
            this.y = e,
            this.z = r,
            this.w = s,
            this
        }
        set(t, e, r, s) {
            return this.copyFromFloats(t, e, r, s)
        }
        setAll(t) {
            return this.x = this.y = this.z = this.w = t,
            this
        }
        static FromArray(t, e) {
            return e || (e = 0),
            new y(t[e], t[e + 1], t[e + 2], t[e + 3])
        }
        static FromArrayToRef(t, e, r) {
            return r.x = t[e],
            r.y = t[e + 1],
            r.z = t[e + 2],
            r.w = t[e + 3],
            r
        }
        static FromFloatArrayToRef(t, e, r) {
            return y.FromArrayToRef(t, e, r),
            r
        }
        static FromFloatsToRef(t, e, r, s, i) {
            return i.x = t,
            i.y = e,
            i.z = r,
            i.w = s,
            i
        }
        static Zero() {
            return new y(0, 0, 0, 0)
        }
        static One() {
            return new y(1, 1, 1, 1)
        }
        static Random(e = 0, r = 1) {
            return new y(t.RandomRange(e, r), t.RandomRange(e, r), t.RandomRange(e, r), t.RandomRange(e, r))
        }
        static get ZeroReadOnly() {
            return y._ZeroReadOnly
        }
        static Normalize(t) {
            const e = y.Zero();
            return y.NormalizeToRef(t, e),
            e
        }
        static NormalizeToRef(t, e) {
            return e.copyFrom(t),
            e.normalize(),
            e
        }
        static Minimize(t, e) {
            const r = new t.constructor;
            return r.copyFrom(t),
            r.minimizeInPlace(e),
            r
        }
        static Maximize(t, e) {
            const r = new t.constructor;
            return r.copyFrom(t),
            r.maximizeInPlace(e),
            r
        }
        static Distance(t, e) {
            return Math.sqrt(y.DistanceSquared(t, e))
        }
        static DistanceSquared(t, e) {
            const r = t.x - e.x,
                s = t.y - e.y,
                i = t.z - e.z,
                o = t.w - e.w;
            return r * r + s * s + i * i + o * o
        }
        static Center(t, e) {
            return y.CenterToRef(t, e, y.Zero())
        }
        static CenterToRef(t, e, r) {
            return r.copyFromFloats((t.x + e.x) / 2, (t.y + e.y) / 2, (t.z + e.z) / 2, (t.w + e.w) / 2)
        }
        static TransformCoordinates(t, e) {
            const r = y.Zero();
            return y.TransformCoordinatesToRef(t, e, r),
            r
        }
        static TransformCoordinatesToRef(t, e, r) {
            return y.TransformCoordinatesFromFloatsToRef(t._x, t._y, t._z, e, r),
            r
        }
        static TransformCoordinatesFromFloatsToRef(t, e, r, s, i) {
            const o = s.m,
                n = t * o[0] + e * o[4] + r * o[8] + o[12],
                a = t * o[1] + e * o[5] + r * o[9] + o[13],
                h = t * o[2] + e * o[6] + r * o[10] + o[14],
                c = t * o[3] + e * o[7] + r * o[11] + o[15];
            return i.x = n,
            i.y = a,
            i.z = h,
            i.w = c,
            i
        }
        static TransformNormal(t, e) {
            const r = new t.constructor;
            return y.TransformNormalToRef(t, e, r),
            r
        }
        static TransformNormalToRef(t, e, r) {
            const s = e.m,
                i = t.x * s[0] + t.y * s[4] + t.z * s[8],
                o = t.x * s[1] + t.y * s[5] + t.z * s[9],
                n = t.x * s[2] + t.y * s[6] + t.z * s[10];
            return r.x = i,
            r.y = o,
            r.z = n,
            r.w = t.w,
            r
        }
        static TransformNormalFromFloatsToRef(t, e, r, s, i, o) {
            const n = i.m;
            return o.x = t * n[0] + e * n[4] + r * n[8],
            o.y = t * n[1] + e * n[5] + r * n[9],
            o.z = t * n[2] + e * n[6] + r * n[10],
            o.w = s,
            o
        }
        static FromVector3(t, e = 0) {
            return new y(t._x, t._y, t._z, e)
        }
    }
    y._ZeroReadOnly = y.Zero();
    class m {
        get x() {
            return this._x
        }
        set x(t) {
            this._x = t,
            this._isDirty = !0
        }
        get y() {
            return this._y
        }
        set y(t) {
            this._y = t,
            this._isDirty = !0
        }
        get z() {
            return this._z
        }
        set z(t) {
            this._z = t,
            this._isDirty = !0
        }
        get w() {
            return this._w
        }
        set w(t) {
            this._w = t,
            this._isDirty = !0
        }
        constructor(t = 0, e = 0, r = 0, s = 1) {
            this._isDirty = !0,
            this._x = t,
            this._y = e,
            this._z = r,
            this._w = s
        }
        toString() {
            return `{X: ${this._x} Y: ${this._y} Z: ${this._z} W: ${this._w}}`
        }
        getClassName() {
            return "Quaternion"
        }
        getHashCode() {
            let t = _(this._x);
            return t = 397 * t ^ _(this._y),
            t = 397 * t ^ _(this._z),
            t = 397 * t ^ _(this._w),
            t
        }
        asArray() {
            return [this._x, this._y, this._z, this._w]
        }
        toArray(t, e = 0) {
            return t[e] = this._x,
            t[e + 1] = this._y,
            t[e + 2] = this._z,
            t[e + 3] = this._w,
            this
        }
        equals(t) {
            return t && this._x === t._x && this._y === t._y && this._z === t._z && this._w === t._w
        }
        equalsWithEpsilon(e, r = .001) {
            return e && t.WithinEpsilon(this._x, e._x, r) && t.WithinEpsilon(this._y, e._y, r) && t.WithinEpsilon(this._z, e._z, r) && t.WithinEpsilon(this._w, e._w, r)
        }
        clone() {
            return new this.constructor(this._x, this._y, this._z, this._w)
        }
        copyFrom(t) {
            return this._x = t._x,
            this._y = t._y,
            this._z = t._z,
            this._w = t._w,
            this._isDirty = !0,
            this
        }
        copyFromFloats(t, e, r, s) {
            return this._x = t,
            this._y = e,
            this._z = r,
            this._w = s,
            this._isDirty = !0,
            this
        }
        set(t, e, r, s) {
            return this.copyFromFloats(t, e, r, s)
        }
        add(t) {
            return new this.constructor(this._x + t._x, this._y + t._y, this._z + t._z, this._w + t._w)
        }
        addInPlace(t) {
            return this._x += t._x,
            this._y += t._y,
            this._z += t._z,
            this._w += t._w,
            this._isDirty = !0,
            this
        }
        subtract(t) {
            return new this.constructor(this._x - t._x, this._y - t._y, this._z - t._z, this._w - t._w)
        }
        subtractInPlace(t) {
            return this._x -= t._x,
            this._y -= t._y,
            this._z -= t._z,
            this._w -= t._w,
            this._isDirty = !0,
            this
        }
        scale(t) {
            return new this.constructor(this._x * t, this._y * t, this._z * t, this._w * t)
        }
        scaleToRef(t, e) {
            return e._x = this._x * t,
            e._y = this._y * t,
            e._z = this._z * t,
            e._w = this._w * t,
            e._isDirty = !0,
            e
        }
        scaleInPlace(t) {
            return this._x *= t,
            this._y *= t,
            this._z *= t,
            this._w *= t,
            this._isDirty = !0,
            this
        }
        scaleAndAddToRef(t, e) {
            return e._x += this._x * t,
            e._y += this._y * t,
            e._z += this._z * t,
            e._w += this._w * t,
            e._isDirty = !0,
            e
        }
        multiply(t) {
            const e = new this.constructor(0, 0, 0, 1);
            return this.multiplyToRef(t, e),
            e
        }
        multiplyToRef(t, e) {
            const r = this._x * t._w + this._y * t._z - this._z * t._y + this._w * t._x,
                s = -this._x * t._z + this._y * t._w + this._z * t._x + this._w * t._y,
                i = this._x * t._y - this._y * t._x + this._z * t._w + this._w * t._z,
                o = -this._x * t._x - this._y * t._y - this._z * t._z + this._w * t._w;
            return e.copyFromFloats(r, s, i, o),
            e
        }
        multiplyInPlace(t) {
            return this.multiplyToRef(t, this),
            this
        }
        conjugateToRef(t) {
            return t.copyFromFloats(-this._x, -this._y, -this._z, this._w),
            t
        }
        conjugateInPlace() {
            return this._x *= -1,
            this._y *= -1,
            this._z *= -1,
            this._isDirty = !0,
            this
        }
        conjugate() {
            return new this.constructor(-this._x, -this._y, -this._z, this._w)
        }
        invert() {
            const t = this.conjugate(),
                e = this.lengthSquared();
            return 0 == e || 1 == e || t.scaleInPlace(1 / e),
            t
        }
        invertInPlace() {
            this.conjugateInPlace();
            const t = this.lengthSquared();
            return 0 == t || 1 == t || this.scaleInPlace(1 / t),
            this
        }
        lengthSquared() {
            return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
        }
        length() {
            return Math.sqrt(this.lengthSquared())
        }
        normalize() {
            const t = this.length();
            if (0 === t) 
                return this;
            const e = 1 / t;
            return this.scaleInPlace(e),
            this
        }
        normalizeToNew() {
            const t = this.length();
            if (0 === t) 
                return this.clone();
            const e = 1 / t;
            return this.scale(e)
        }
        toEulerAngles() {
            const t = l.Zero();
            return this.toEulerAnglesToRef(t),
            t
        }
        toEulerAnglesToRef(t) {
            const e = this._z,
                r = this._x,
                s = this._y,
                i = this._w,
                o = s * e - r * i,
                n = .4999999;
            if (o < -n) 
                t._y = 2 * Math.atan2(s, i),
                t._x = Math.PI / 2,
                t._z = 0,
                t._isDirty = !0;
            else if (o > n) 
                t._y = 2 * Math.atan2(s, i),
                t._x = -Math.PI / 2,
                t._z = 0,
                t._isDirty = !0;
            else {
                const n = i * i,
                    a = e * e,
                    h = r * r,
                    c = s * s;
                t._z = Math.atan2(2 * (r * s + e * i), -a - h + c + n),
                t._x = Math.asin(-2 * o),
                t._y = Math.atan2(2 * (e * r + s * i), a - h - c + n),
                t._isDirty = !0
            }
            return t
        }
        toRotationMatrix(t) {
            return x.FromQuaternionToRef(this, t),
            t
        }
        fromRotationMatrix(t) {
            return m.FromRotationMatrixToRef(t, this),
            this
        }
        static FromRotationMatrix(t) {
            const e = new m;
            return m.FromRotationMatrixToRef(t, e),
            e
        }
        static FromRotationMatrixToRef(t, e) {
            const r = t.m,
                s = r[0],
                i = r[4],
                o = r[8],
                n = r[1],
                a = r[5],
                h = r[9],
                c = r[2],
                _ = r[6],
                u = r[10],
                l = s + a + u;
            let y;
            return l > 0
                ? (y = .5 / Math.sqrt(l + 1), e._w = .25 / y, e._x = (_ - h) * y, e._y = (o - c) * y, e._z = (n - i) * y, e._isDirty = !0)
                : s > a && s > u
                    ? (y = 2 * Math.sqrt(1 + s - a - u), e._w = (_ - h) / y, e._x = .25 * y, e._y = (i + n) / y, e._z = (o + c) / y, e._isDirty = !0)
                    : a > u
                        ? (y = 2 * Math.sqrt(1 + a - s - u), e._w = (o - c) / y, e._x = (i + n) / y, e._y = .25 * y, e._z = (h + _) / y, e._isDirty = !0)
                        : (y = 2 * Math.sqrt(1 + u - s - a), e._w = (n - i) / y, e._x = (o + c) / y, e._y = (h + _) / y, e._z = .25 * y, e._isDirty = !0),
            e
        }
        static Dot(t, e) {
            return t._x * e._x + t._y * e._y + t._z * e._z + t._w * e._w
        }
        static AreClose(t, e, r = .1) {
            const s = m.Dot(t, e);
            return 1 - s * s <= r
        }
        static SmoothToRef(e, r, s, i, o) {
            let n = 0 === i
                ? 1
                : s / i;
            return n = t.Clamp(n, 0, 1),
            m.SlerpToRef(e, r, n, o),
            o
        }
        static Zero() {
            return new m(0, 0, 0, 0)
        }
        static Inverse(t) {
            return new t.constructor(-t._x, -t._y, -t._z, t._w)
        }
        static InverseToRef(t, e) {
            return e.set(-t._x, -t._y, -t._z, t._w),
            e
        }
        static Identity() {
            return new m(0, 0, 0, 1)
        }
        static IsIdentity(t) {
            return t && 0 === t._x && 0 === t._y && 0 === t._z && 1 === t._w
        }
        static RotationAxis(t, e) {
            return m.RotationAxisToRef(t, e, new m)
        }
        static RotationAxisToRef(t, e, r) {
            const s = Math.sin(e / 2);
            return t.normalize(),
            r._w = Math.cos(e / 2),
            r._x = t._x * s,
            r._y = t._y * s,
            r._z = t._z * s,
            r._isDirty = !0,
            r
        }
        static FromArray(t, e) {
            return e || (e = 0),
            new m(t[e], t[e + 1], t[e + 2], t[e + 3])
        }
        static FromArrayToRef(t, e, r) {
            return r._x = t[e],
            r._y = t[e + 1],
            r._z = t[e + 2],
            r._w = t[e + 3],
            r._isDirty = !0,
            r
        }
        static FromEulerAngles(t, e, r) {
            const s = new m;
            return m.RotationYawPitchRollToRef(e, t, r, s),
            s
        }
        static FromEulerAnglesToRef(t, e, r, s) {
            return m.RotationYawPitchRollToRef(e, t, r, s),
            s
        }
        static FromEulerVector(t) {
            const e = new m;
            return m.RotationYawPitchRollToRef(t._y, t._x, t._z, e),
            e
        }
        static FromEulerVectorToRef(t, e) {
            return m.RotationYawPitchRollToRef(t._y, t._x, t._z, e),
            e
        }
        static FromUnitVectorsToRef(t, e, r, s = .001) {
            const i = l.Dot(t, e) + 1;
            return i < s
                ? Math.abs(t.x) > Math.abs(t.z)
                    ? r.set(-t.y, t.x, 0, 0)
                    : r.set(0, -t.z, t.y, 0)
                : (l.CrossToRef(t, e, R.Vector3[0]), r.set(R.Vector3[0].x, R.Vector3[0].y, R.Vector3[0].z, i)),
            r.normalize()
        }
        static RotationYawPitchRoll(t, e, r) {
            const s = new m;
            return m.RotationYawPitchRollToRef(t, e, r, s),
            s
        }
        static RotationYawPitchRollToRef(t, e, r, s) {
            const i = .5 * r,
                o = .5 * e,
                n = .5 * t,
                a = Math.sin(i),
                h = Math.cos(i),
                c = Math.sin(o),
                _ = Math.cos(o),
                u = Math.sin(n),
                l = Math.cos(n);
            return s._x = l * c * h + u * _ * a,
            s._y = u * _ * h - l * c * a,
            s._z = l * _ * a - u * c * h,
            s._w = l * _ * h + u * c * a,
            s._isDirty = !0,
            s
        }
        static RotationAlphaBetaGamma(t, e, r) {
            const s = new m;
            return m.RotationAlphaBetaGammaToRef(t, e, r, s),
            s
        }
        static RotationAlphaBetaGammaToRef(t, e, r, s) {
            const i = .5 * (r + t),
                o = .5 * (r - t),
                n = .5 * e;
            return s._x = Math.cos(o) * Math.sin(n),
            s._y = Math.sin(o) * Math.sin(n),
            s._z = Math.sin(i) * Math.cos(n),
            s._w = Math.cos(i) * Math.cos(n),
            s._isDirty = !0,
            s
        }
        static RotationQuaternionFromAxis(t, e, r) {
            const s = new m(0, 0, 0, 0);
            return m.RotationQuaternionFromAxisToRef(t, e, r, s),
            s
        }
        static RotationQuaternionFromAxisToRef(t, e, r, s) {
            const i = f.Matrix[0];
            return x.FromXYZAxesToRef(t.normalize(), e.normalize(), r.normalize(), i),
            m.FromRotationMatrixToRef(i, s),
            s
        }
        static FromLookDirectionLH(t, e) {
            const r = new m;
            return m.FromLookDirectionLHToRef(t, e, r),
            r
        }
        static FromLookDirectionLHToRef(t, e, r) {
            const s = f.Matrix[0];
            return x.LookDirectionLHToRef(t, e, s),
            m.FromRotationMatrixToRef(s, r),
            r
        }
        static FromLookDirectionRH(t, e) {
            const r = new m;
            return m.FromLookDirectionRHToRef(t, e, r),
            r
        }
        static FromLookDirectionRHToRef(t, e, r) {
            const s = f.Matrix[0];
            return x.LookDirectionRHToRef(t, e, s),
            m.FromRotationMatrixToRef(s, r)
        }
        static Slerp(t, e, r) {
            const s = m.Identity();
            return m.SlerpToRef(t, e, r, s),
            s
        }
        static SlerpToRef(t, e, r, s) {
            let i,
                o,
                n = t._x * e._x + t._y * e._y + t._z * e._z + t._w * e._w,
                a = !1;
            if (n < 0 && (a = !0, n = -n), n > .999999) 
                o = 1 - r,
                i = a
                    ? -r
                    : r;
            else {
                const t = Math.acos(n),
                    e = 1 / Math.sin(t);
                o = Math.sin((1 - r) * t) * e,
                i = a
                    ? -Math.sin(r * t) * e
                    : Math.sin(r * t) * e
            }
            return s._x = o * t._x + i * e._x,
            s._y = o * t._y + i * e._y,
            s._z = o * t._z + i * e._z,
            s._w = o * t._w + i * e._w,
            s._isDirty = !0,
            s
        }
        static Hermite(t, e, r, s, i) {
            const o = i * i,
                n = i * o,
                a = 2 * n - 3 * o + 1,
                h = -2 * n + 3 * o,
                c = n - 2 * o + i,
                _ = n - o,
                u = t._x * a + r._x * h + e._x * c + s._x * _,
                l = t._y * a + r._y * h + e._y * c + s._y * _,
                y = t._z * a + r._z * h + e._z * c + s._z * _,
                m = t._w * a + r._w * h + e._w * c + s._w * _;
            return new t.constructor(u, l, y, m)
        }
        static Hermite1stDerivative(t, e, r, s, i) {
            const o = new t.constructor;
            return this.Hermite1stDerivativeToRef(t, e, r, s, i, o),
            o
        }
        static Hermite1stDerivativeToRef(t, e, r, s, i, o) {
            const n = i * i;
            return o._x = 6 * (n - i) * t._x + (3 * n - 4 * i + 1) * e._x + 6 * (-n + i) * r._x + (3 * n - 2 * i) * s._x,
            o._y = 6 * (n - i) * t._y + (3 * n - 4 * i + 1) * e._y + 6 * (-n + i) * r._y + (3 * n - 2 * i) * s._y,
            o._z = 6 * (n - i) * t._z + (3 * n - 4 * i + 1) * e._z + 6 * (-n + i) * r._z + (3 * n - 2 * i) * s._z,
            o._w = 6 * (n - i) * t._w + (3 * n - 4 * i + 1) * e._w + 6 * (-n + i) * r._w + (3 * n - 2 * i) * s._w,
            o._isDirty = !0,
            o
        }
    }
    class x {
        static get Use64Bits() {
            return o.MatrixUse64Bits
        }
        get m() {
            return this._m
        }
        markAsUpdated() {
            this.updateFlag = x._UpdateFlagSeed++,
            this._isIdentity = !1,
            this._isIdentity3x2 = !1,
            this._isIdentityDirty = !0,
            this._isIdentity3x2Dirty = !0
        }
        _updateIdentityStatus(t, e = !1, r = !1, s = !0) {
            this._isIdentity = t,
            this._isIdentity3x2 = t || r,
            this._isIdentityDirty = !this._isIdentity && e,
            this._isIdentity3x2Dirty = !this._isIdentity3x2 && s
        }
        constructor() {
            this._isIdentity = !1,
            this._isIdentityDirty = !0,
            this._isIdentity3x2 = !0,
            this._isIdentity3x2Dirty = !0,
            this.updateFlag = -1,
            o.MatrixTrackPrecisionChange && o
                .MatrixTrackedMatrices
                .push(this),
            this._m = new o.MatrixCurrentType(16),
            this.markAsUpdated()
        }
        isIdentity() {
            if (this._isIdentityDirty) {
                this._isIdentityDirty = !1;
                const t = this._m;
                this._isIdentity = 1 === t[0] && 0 === t[1] && 0 === t[2] && 0 === t[3] && 0 === t[4] && 1 === t[5] && 0 === t[6] && 0 === t[7] && 0 === t[8] && 0 === t[9] && 1 === t[10] && 0 === t[11] && 0 === t[12] && 0 === t[13] && 0 === t[14] && 1 === t[15]
            }
            return this._isIdentity
        }
        isIdentityAs3x2() {
            return this._isIdentity3x2Dirty && (this._isIdentity3x2Dirty = !1, 1 !== this._m[0] || 1 !== this._m[5] || 1 !== this._m[15] || 0 !== this._m[1] || 0 !== this._m[2] || 0 !== this._m[3] || 0 !== this._m[4] || 0 !== this._m[6] || 0 !== this._m[7] || 0 !== this._m[8] || 0 !== this._m[9] || 0 !== this._m[10] || 0 !== this._m[11] || 0 !== this._m[12] || 0 !== this._m[13] || 0 !== this._m[14]
                ? this._isIdentity3x2 = !1
                : this._isIdentity3x2 = !0),
            this._isIdentity3x2
        }
        determinant() {
            if (!0 === this._isIdentity) 
                return 1;
            const t = this._m,
                e = t[0],
                r = t[1],
                s = t[2],
                i = t[3],
                o = t[4],
                n = t[5],
                a = t[6],
                h = t[7],
                c = t[8],
                _ = t[9],
                u = t[10],
                l = t[11],
                y = t[12],
                m = t[13],
                x = t[14],
                f = t[15],
                R = u * f - x * l,
                d = _ * f - m * l,
                z = _ * x - m * u,
                T = c * f - y * l,
                w = c * x - u * y,
                p = c * m - y * _;
            return e *+ (n * R - a * d + h * z) + r * -(o * R - a * T + h * w) + s *+ (o * d - n * T + h * p) + i * -(o * z - n * w + a * p)
        }
        toArray() {
            return this._m
        }
        asArray() {
            return this._m
        }
        invert() {
            return this.invertToRef(this),
            this
        }
        reset() {
            return x.FromValuesToRef(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this),
            this._updateIdentityStatus(!1),
            this
        }
        add(t) {
            const e = new this.constructor;
            return this.addToRef(t, e),
            e
        }
        addToRef(t, e) {
            const r = this._m,
                s = e._m,
                i = t.m;
            for (let t = 0; t < 16; t++) 
                s[t] = r[t] + i[t];
            return e.markAsUpdated(),
            e
        }
        addToSelf(t) {
            const e = this._m,
                r = t.m;
            for (let t = 0; t < 16; t++) 
                e[t] += r[t];
            return this.markAsUpdated(),
            this
        }
        invertToRef(t) {
            if (!0 === this._isIdentity) 
                return x.IdentityToRef(t),
                t;
            const e = this._m,
                r = e[0],
                s = e[1],
                i = e[2],
                o = e[3],
                n = e[4],
                a = e[5],
                h = e[6],
                c = e[7],
                _ = e[8],
                u = e[9],
                l = e[10],
                y = e[11],
                m = e[12],
                f = e[13],
                R = e[14],
                d = e[15],
                z = l * d - R * y,
                T = u * d - f * y,
                w = u * R - f * l,
                p = _ * d - m * y,
                F = _ * R - l * m,
                M = _ * f - m * u,
                g =+ (a * z - h * T + c * w),
                I = -(n * z - h * p + c * F),
                A =+ (n * T - a * p + c * M),
                D = -(n * w - a * F + h * M),
                P = r * g + s * I + i * A + o * D;
            if (0 === P) 
                return t.copyFrom(this),
                t;
            const v = 1 / P,
                V = h * d - R * c,
                O = a * d - f * c,
                C = a * R - f * h,
                b = n * d - m * c,
                L = n * R - m * h,
                k = n * f - m * a,
                H = h * y - l * c,
                S = a * y - u * c,
                N = a * l - u * h,
                U = n * y - _ * c,
                B = n * l - _ * h,
                q = n * u - _ * a,
                Z = -(s * z - i * T + o * w),
                E =+ (r * z - i * p + o * F),
                Y = -(r * T - s * p + o * M),
                Q =+ (r * w - s * F + i * M),
                W =+ (s * V - i * O + o * C),
                j = -(r * V - i * b + o * L),
                $ =+ (r * O - s * b + o * k),
                G = -(r * C - s * L + i * k),
                X = -(s * H - i * S + o * N),
                J =+ (r * H - i * U + o * B),
                K = -(r * S - s * U + o * q),
                tt =+ (r * N - s * B + i * q);
            return x.FromValuesToRef(g * v, Z * v, W * v, X * v, I * v, E * v, j * v, J * v, A * v, Y * v, $ * v, K * v, D * v, Q * v, G * v, tt * v, t),
            t
        }
        addAtIndex(t, e) {
            return this._m[t] += e,
            this.markAsUpdated(),
            this
        }
        multiplyAtIndex(t, e) {
            return this._m[t] *= e,
            this.markAsUpdated(),
            this
        }
        setTranslationFromFloats(t, e, r) {
            return this._m[12] = t,
            this._m[13] = e,
            this._m[14] = r,
            this.markAsUpdated(),
            this
        }
        addTranslationFromFloats(t, e, r) {
            return this._m[12] += t,
            this._m[13] += e,
            this._m[14] += r,
            this.markAsUpdated(),
            this
        }
        setTranslation(t) {
            return this.setTranslationFromFloats(t._x, t._y, t._z)
        }
        getTranslation() {
            return new l(this._m[12], this._m[13], this._m[14])
        }
        getTranslationToRef(t) {
            return t.x = this._m[12],
            t.y = this._m[13],
            t.z = this._m[14],
            t
        }
        removeRotationAndScaling() {
            const t = this.m;
            return x.FromValuesToRef(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t[12], t[13], t[14], t[15], this),
            this._updateIdentityStatus(0 === t[12] && 0 === t[13] && 0 === t[14] && 1 === t[15]),
            this
        }
        multiply(t) {
            const e = new this.constructor;
            return this.multiplyToRef(t, e),
            e
        }
        copyFrom(t) {
            t.copyToArray(this._m);
            const e = t;
            return this.updateFlag = e.updateFlag,
            this._updateIdentityStatus(e._isIdentity, e._isIdentityDirty, e._isIdentity3x2, e._isIdentity3x2Dirty),
            this
        }
        copyToArray(t, e = 0) {
            const r = this._m;
            return t[e] = r[0],
            t[e + 1] = r[1],
            t[e + 2] = r[2],
            t[e + 3] = r[3],
            t[e + 4] = r[4],
            t[e + 5] = r[5],
            t[e + 6] = r[6],
            t[e + 7] = r[7],
            t[e + 8] = r[8],
            t[e + 9] = r[9],
            t[e + 10] = r[10],
            t[e + 11] = r[11],
            t[e + 12] = r[12],
            t[e + 13] = r[13],
            t[e + 14] = r[14],
            t[e + 15] = r[15],
            this
        }
        multiplyToRef(t, e) {
            return this._isIdentity
                ? (e.copyFrom(t), e)
                : t._isIdentity
                    ? (e.copyFrom(this), e)
                    : (this.multiplyToArray(t, e._m, 0), e.markAsUpdated(), e)
        }
        multiplyToArray(t, e, r) {
            const s = this._m,
                i = t.m,
                o = s[0],
                n = s[1],
                a = s[2],
                h = s[3],
                c = s[4],
                _ = s[5],
                u = s[6],
                l = s[7],
                y = s[8],
                m = s[9],
                x = s[10],
                f = s[11],
                R = s[12],
                d = s[13],
                z = s[14],
                T = s[15],
                w = i[0],
                p = i[1],
                F = i[2],
                M = i[3],
                g = i[4],
                I = i[5],
                A = i[6],
                D = i[7],
                P = i[8],
                v = i[9],
                V = i[10],
                O = i[11],
                C = i[12],
                b = i[13],
                L = i[14],
                k = i[15];
            return e[r] = o * w + n * g + a * P + h * C,
            e[r + 1] = o * p + n * I + a * v + h * b,
            e[r + 2] = o * F + n * A + a * V + h * L,
            e[r + 3] = o * M + n * D + a * O + h * k,
            e[r + 4] = c * w + _ * g + u * P + l * C,
            e[r + 5] = c * p + _ * I + u * v + l * b,
            e[r + 6] = c * F + _ * A + u * V + l * L,
            e[r + 7] = c * M + _ * D + u * O + l * k,
            e[r + 8] = y * w + m * g + x * P + f * C,
            e[r + 9] = y * p + m * I + x * v + f * b,
            e[r + 10] = y * F + m * A + x * V + f * L,
            e[r + 11] = y * M + m * D + x * O + f * k,
            e[r + 12] = R * w + d * g + z * P + T * C,
            e[r + 13] = R * p + d * I + z * v + T * b,
            e[r + 14] = R * F + d * A + z * V + T * L,
            e[r + 15] = R * M + d * D + z * O + T * k,
            this
        }
        equals(t) {
            const e = t;
            if (!e) 
                return !1;
            if ((this._isIdentity || e._isIdentity) && !this._isIdentityDirty && !e._isIdentityDirty) 
                return this._isIdentity && e._isIdentity;
            const r = this.m,
                s = e.m;
            return r[0] === s[0] && r[1] === s[1] && r[2] === s[2] && r[3] === s[3] && r[4] === s[4] && r[5] === s[5] && r[6] === s[6] && r[7] === s[7] && r[8] === s[8] && r[9] === s[9] && r[10] === s[10] && r[11] === s[11] && r[12] === s[12] && r[13] === s[13] && r[14] === s[14] && r[15] === s[15]
        }
        clone() {
            const t = new this.constructor;
            return t.copyFrom(this),
            t
        }
        getClassName() {
            return "Matrix"
        }
        getHashCode() {
            let t = _(this._m[0]);
            for (let e = 1; e < 16; e++) 
                t = 397 * t ^ _(this._m[e]);
            return t
        }
        decomposeToTransformNode(t) {
            return t.rotationQuaternion = t.rotationQuaternion || new m,
            this.decompose(t.scaling, t.rotationQuaternion, t.position)
        }
        decompose(t, e, r, s) {
            if (this._isIdentity) 
                return r && r.setAll(0),
                t && t.setAll(1),
                e && e.copyFromFloats(0, 0, 0, 1),
                !0;
            const i = this._m;
            if (r && r.copyFromFloats(i[12], i[13], i[14]), (t = t || f.Vector3[0]).x = Math.sqrt(i[0] * i[0] + i[1] * i[1] + i[2] * i[2]), t.y = Math.sqrt(i[4] * i[4] + i[5] * i[5] + i[6] * i[6]), t.z = Math.sqrt(i[8] * i[8] + i[9] * i[9] + i[10] * i[10]), s) {
                const e = s.scaling.x < 0
                        ? -1
                        : 1,
                    r = s.scaling.y < 0
                        ? -1
                        : 1,
                    i = s.scaling.z < 0
                        ? -1
                        : 1;
                t.x *= e,
                t.y *= r,
                t.z *= i
            } else 
                this.determinant() <= 0 && (t.y *= -1);
            if (0 === t._x || 0 === t._y || 0 === t._z) 
                return e && e.copyFromFloats(0, 0, 0, 1),
                !1;
            if (e) {
                const r = 1 / t._x,
                    s = 1 / t._y,
                    o = 1 / t._z;
                x.FromValuesToRef(i[0] * r, i[1] * r, i[2] * r, 0, i[4] * s, i[5] * s, i[6] * s, 0, i[8] * o, i[9] * o, i[10] * o, 0, 0, 0, 0, 1, f.Matrix[0]),
                m.FromRotationMatrixToRef(f.Matrix[0], e)
            }
            return !0
        }
        getRow(t) {
            if (t < 0 || t > 3) 
                return null;
            const e = 4 * t;
            return new y(this._m[e + 0], this._m[e + 1], this._m[e + 2], this._m[e + 3])
        }
        getRowToRef(t, e) {
            if (t >= 0 && t < 3) {
                const r = 4 * t;
                e.x = this._m[r + 0],
                e.y = this._m[r + 1],
                e.z = this._m[r + 2],
                e.w = this._m[r + 3]
            }
            return e
        }
        setRow(t, e) {
            return this.setRowFromFloats(t, e.x, e.y, e.z, e.w)
        }
        transpose() {
            const t = new this.constructor;
            return x.TransposeToRef(this, t),
            t
        }
        transposeToRef(t) {
            return x.TransposeToRef(this, t),
            t
        }
        setRowFromFloats(t, e, r, s, i) {
            if (t < 0 || t > 3) 
                return this;
            const o = 4 * t;
            return this._m[o + 0] = e,
            this._m[o + 1] = r,
            this._m[o + 2] = s,
            this._m[o + 3] = i,
            this.markAsUpdated(),
            this
        }
        scale(t) {
            const e = new this.constructor;
            return this.scaleToRef(t, e),
            e
        }
        scaleToRef(t, e) {
            for (let r = 0; r < 16; r++) 
                e._m[r] = this._m[r] * t;
            return e.markAsUpdated(),
            e
        }
        scaleAndAddToRef(t, e) {
            for (let r = 0; r < 16; r++) 
                e._m[r] += this._m[r] * t;
            return e.markAsUpdated(),
            e
        }
        toNormalMatrix(t) {
            const e = f.Matrix[0];
            this.invertToRef(e),
            e.transposeToRef(t);
            const r = t._m;
            return x.FromValuesToRef(r[0], r[1], r[2], 0, r[4], r[5], r[6], 0, r[8], r[9], r[10], 0, 0, 0, 0, 1, t),
            t
        }
        getRotationMatrix() {
            const t = new this.constructor;
            return this.getRotationMatrixToRef(t),
            t
        }
        getRotationMatrixToRef(t) {
            const e = f.Vector3[0];
            if (!this.decompose(e)) 
                return x.IdentityToRef(t),
                t;
            const r = this._m,
                s = 1 / e._x,
                i = 1 / e._y,
                o = 1 / e._z;
            return x.FromValuesToRef(r[0] * s, r[1] * s, r[2] * s, 0, r[4] * i, r[5] * i, r[6] * i, 0, r[8] * o, r[9] * o, r[10] * o, 0, 0, 0, 0, 1, t),
            t
        }
        toggleModelMatrixHandInPlace() {
            const t = this._m;
            return t[2] *= -1,
            t[6] *= -1,
            t[8] *= -1,
            t[9] *= -1,
            t[14] *= -1,
            this.markAsUpdated(),
            this
        }
        toggleProjectionMatrixHandInPlace() {
            const t = this._m;
            return t[8] *= -1,
            t[9] *= -1,
            t[10] *= -1,
            t[11] *= -1,
            this.markAsUpdated(),
            this
        }
        static FromArray(t, e = 0) {
            const r = new x;
            return x.FromArrayToRef(t, e, r),
            r
        }
        static FromArrayToRef(t, e, r) {
            for (let s = 0; s < 16; s++) 
                r._m[s] = t[s + e];
            return r.markAsUpdated(),
            r
        }
        static FromFloat32ArrayToRefScaled(t, e, r, s) {
            for (let i = 0; i < 16; i++) 
                s._m[i] = t[i + e] * r;
            return s.markAsUpdated(),
            s
        }
        static get IdentityReadOnly() {
            return x._IdentityReadOnly
        }
        static FromValuesToRef(t, e, r, s, i, o, n, a, h, c, _, u, l, y, m, x, f) {
            const R = f._m;
            R[0] = t,
            R[1] = e,
            R[2] = r,
            R[3] = s,
            R[4] = i,
            R[5] = o,
            R[6] = n,
            R[7] = a,
            R[8] = h,
            R[9] = c,
            R[10] = _,
            R[11] = u,
            R[12] = l,
            R[13] = y,
            R[14] = m,
            R[15] = x,
            f.markAsUpdated()
        }
        static FromValues(t, e, r, s, i, o, n, a, h, c, _, u, l, y, m, f) {
            const R = new x,
                d = R._m;
            return d[0] = t,
            d[1] = e,
            d[2] = r,
            d[3] = s,
            d[4] = i,
            d[5] = o,
            d[6] = n,
            d[7] = a,
            d[8] = h,
            d[9] = c,
            d[10] = _,
            d[11] = u,
            d[12] = l,
            d[13] = y,
            d[14] = m,
            d[15] = f,
            R.markAsUpdated(),
            R
        }
        static Compose(t, e, r) {
            const s = new x;
            return x.ComposeToRef(t, e, r, s),
            s
        }
        static ComposeToRef(t, e, r, s) {
            const i = s._m,
                o = e._x,
                n = e._y,
                a = e._z,
                h = e._w,
                c = o + o,
                _ = n + n,
                u = a + a,
                l = o * c,
                y = o * _,
                m = o * u,
                x = n * _,
                f = n * u,
                R = a * u,
                d = h * c,
                z = h * _,
                T = h * u,
                w = t._x,
                p = t._y,
                F = t._z;
            return i[0] = (1 - (x + R)) * w,
            i[1] = (y + T) * w,
            i[2] = (m - z) * w,
            i[3] = 0,
            i[4] = (y - T) * p,
            i[5] = (1 - (l + R)) * p,
            i[6] = (f + d) * p,
            i[7] = 0,
            i[8] = (m + z) * F,
            i[9] = (f - d) * F,
            i[10] = (1 - (l + x)) * F,
            i[11] = 0,
            i[12] = r._x,
            i[13] = r._y,
            i[14] = r._z,
            i[15] = 1,
            s.markAsUpdated(),
            s
        }
        static Identity() {
            const t = x.FromValues(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            return t._updateIdentityStatus(!0),
            t
        }
        static IdentityToRef(t) {
            return x.FromValuesToRef(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, t),
            t._updateIdentityStatus(!0),
            t
        }
        static Zero() {
            const t = x.FromValues(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            return t._updateIdentityStatus(!1),
            t
        }
        static RotationX(t) {
            const e = new x;
            return x.RotationXToRef(t, e),
            e
        }
        static Invert(t) {
            const e = new t.constructor;
            return t.invertToRef(e),
            e
        }
        static RotationXToRef(t, e) {
            const r = Math.sin(t),
                s = Math.cos(t);
            return x.FromValuesToRef(1, 0, 0, 0, 0, s, r, 0, 0, -r, s, 0, 0, 0, 0, 1, e),
            e._updateIdentityStatus(1 === s && 0 === r),
            e
        }
        static RotationY(t) {
            const e = new x;
            return x.RotationYToRef(t, e),
            e
        }
        static RotationYToRef(t, e) {
            const r = Math.sin(t),
                s = Math.cos(t);
            return x.FromValuesToRef(s, 0, -r, 0, 0, 1, 0, 0, r, 0, s, 0, 0, 0, 0, 1, e),
            e._updateIdentityStatus(1 === s && 0 === r),
            e
        }
        static RotationZ(t) {
            const e = new x;
            return x.RotationZToRef(t, e),
            e
        }
        static RotationZToRef(t, e) {
            const r = Math.sin(t),
                s = Math.cos(t);
            return x.FromValuesToRef(s, r, 0, 0, -r, s, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, e),
            e._updateIdentityStatus(1 === s && 0 === r),
            e
        }
        static RotationAxis(t, e) {
            const r = new x;
            return x.RotationAxisToRef(t, e, r),
            r
        }
        static RotationAxisToRef(t, e, r) {
            const s = Math.sin(-e),
                i = Math.cos(-e),
                o = 1 - i;
            t.normalize();
            const n = r._m;
            return n[0] = t._x * t._x * o + i,
            n[1] = t._x * t._y * o - t._z * s,
            n[2] = t._x * t._z * o + t._y * s,
            n[3] = 0,
            n[4] = t._y * t._x * o + t._z * s,
            n[5] = t._y * t._y * o + i,
            n[6] = t._y * t._z * o - t._x * s,
            n[7] = 0,
            n[8] = t._z * t._x * o - t._y * s,
            n[9] = t._z * t._y * o + t._x * s,
            n[10] = t._z * t._z * o + i,
            n[11] = 0,
            n[12] = 0,
            n[13] = 0,
            n[14] = 0,
            n[15] = 1,
            r.markAsUpdated(),
            r
        }
        static RotationAlignToRef(t, e, r) {
            const s = l.Dot(e, t),
                i = r._m;
            if (s < -.999) 
                i[0] = -1,
                i[1] = 0,
                i[2] = 0,
                i[3] = 0,
                i[4] = 0,
                i[5] = -1,
                i[6] = 0,
                i[7] = 0,
                i[8] = 0,
                i[9] = 0,
                i[10] = 1,
                i[11] = 0;
            else {
                const r = l.Cross(e, t),
                    o = 1 / (1 + s);
                i[0] = r._x * r._x * o + s,
                i[1] = r._y * r._x * o - r._z,
                i[2] = r._z * r._x * o + r._y,
                i[3] = 0,
                i[4] = r._x * r._y * o + r._z,
                i[5] = r._y * r._y * o + s,
                i[6] = r._z * r._y * o - r._x,
                i[7] = 0,
                i[8] = r._x * r._z * o - r._y,
                i[9] = r._y * r._z * o + r._x,
                i[10] = r._z * r._z * o + s,
                i[11] = 0
            }
            return i[12] = 0,
            i[13] = 0,
            i[14] = 0,
            i[15] = 1,
            r.markAsUpdated(),
            r
        }
        static RotationYawPitchRoll(t, e, r) {
            const s = new x;
            return x.RotationYawPitchRollToRef(t, e, r, s),
            s
        }
        static RotationYawPitchRollToRef(t, e, r, s) {
            return m.RotationYawPitchRollToRef(t, e, r, f.Quaternion[0]),
            f
                .Quaternion[0]
                .toRotationMatrix(s),
            s
        }
        static Scaling(t, e, r) {
            const s = new x;
            return x.ScalingToRef(t, e, r, s),
            s
        }
        static ScalingToRef(t, e, r, s) {
            return x.FromValuesToRef(t, 0, 0, 0, 0, e, 0, 0, 0, 0, r, 0, 0, 0, 0, 1, s),
            s._updateIdentityStatus(1 === t && 1 === e && 1 === r),
            s
        }
        static Translation(t, e, r) {
            const s = new x;
            return x.TranslationToRef(t, e, r, s),
            s
        }
        static TranslationToRef(t, e, r, s) {
            return x.FromValuesToRef(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, r, 1, s),
            s._updateIdentityStatus(0 === t && 0 === e && 0 === r),
            s
        }
        static Lerp(t, e, r) {
            const s = new t.constructor;
            return x.LerpToRef(t, e, r, s),
            s
        }
        static LerpToRef(t, e, r, s) {
            const i = s._m,
                o = t.m,
                n = e.m;
            for (let t = 0; t < 16; t++) 
                i[t] = o[t] * (1 - r) + n[t] * r;
            return s.markAsUpdated(),
            s
        }
        static DecomposeLerp(t, e, r) {
            const s = new t.constructor;
            return x.DecomposeLerpToRef(t, e, r, s),
            s
        }
        static DecomposeLerpToRef(t, e, r, s) {
            const i = f.Vector3[0],
                o = f.Quaternion[0],
                n = f.Vector3[1];
            t.decompose(i, o, n);
            const a = f.Vector3[2],
                h = f.Quaternion[1],
                c = f.Vector3[3];
            e.decompose(a, h, c);
            const _ = f.Vector3[4];
            l.LerpToRef(i, a, r, _);
            const u = f.Quaternion[2];
            m.SlerpToRef(o, h, r, u);
            const y = f.Vector3[5];
            return l.LerpToRef(n, c, r, y),
            x.ComposeToRef(_, u, y, s),
            s
        }
        static LookAtLH(t, e, r) {
            const s = new x;
            return x.LookAtLHToRef(t, e, r, s),
            s
        }
        static LookAtLHToRef(t, e, r, s) {
            const i = f.Vector3[0],
                o = f.Vector3[1],
                n = f.Vector3[2];
            e.subtractToRef(t, n),
            n.normalize(),
            l.CrossToRef(r, n, i);
            const a = i.lengthSquared();
            0 === a
                ? i.x = 1
                : i.normalizeFromLength(Math.sqrt(a)),
            l.CrossToRef(n, i, o),
            o.normalize();
            const h = -l.Dot(i, t),
                c = -l.Dot(o, t),
                _ = -l.Dot(n, t);
            x.FromValuesToRef(i._x, o._x, n._x, 0, i._y, o._y, n._y, 0, i._z, o._z, n._z, 0, h, c, _, 1, s)
        }
        static LookAtRH(t, e, r) {
            const s = new x;
            return x.LookAtRHToRef(t, e, r, s),
            s
        }
        static LookAtRHToRef(t, e, r, s) {
            const i = f.Vector3[0],
                o = f.Vector3[1],
                n = f.Vector3[2];
            t.subtractToRef(e, n),
            n.normalize(),
            l.CrossToRef(r, n, i);
            const a = i.lengthSquared();
            0 === a
                ? i.x = 1
                : i.normalizeFromLength(Math.sqrt(a)),
            l.CrossToRef(n, i, o),
            o.normalize();
            const h = -l.Dot(i, t),
                c = -l.Dot(o, t),
                _ = -l.Dot(n, t);
            return x.FromValuesToRef(i._x, o._x, n._x, 0, i._y, o._y, n._y, 0, i._z, o._z, n._z, 0, h, c, _, 1, s),
            s
        }
        static LookDirectionLH(t, e) {
            const r = new x;
            return x.LookDirectionLHToRef(t, e, r),
            r
        }
        static LookDirectionLHToRef(t, e, r) {
            const s = f.Vector3[0];
            s.copyFrom(t),
            s.scaleInPlace(-1);
            const i = f.Vector3[1];
            return l.CrossToRef(e, s, i),
            x.FromValuesToRef(i._x, i._y, i._z, 0, e._x, e._y, e._z, 0, s._x, s._y, s._z, 0, 0, 0, 0, 1, r),
            r
        }
        static LookDirectionRH(t, e) {
            const r = new x;
            return x.LookDirectionRHToRef(t, e, r),
            r
        }
        static LookDirectionRHToRef(t, e, r) {
            const s = f.Vector3[2];
            return l.CrossToRef(e, t, s),
            x.FromValuesToRef(s._x, s._y, s._z, 0, e._x, e._y, e._z, 0, t._x, t._y, t._z, 0, 0, 0, 0, 1, r),
            r
        }
        static OrthoLH(t, e, r, s, i) {
            const o = new x;
            return x.OrthoLHToRef(t, e, r, s, o, i),
            o
        }
        static OrthoLHToRef(t, e, r, s, i, o) {
            const n = 2 / t,
                a = 2 / e,
                h = 2 / (s - r),
                c = -(s + r) / (s - r);
            return x.FromValuesToRef(n, 0, 0, 0, 0, a, 0, 0, 0, 0, h, 0, 0, 0, c, 1, i),
            o && i.multiplyToRef(d, i),
            i._updateIdentityStatus(1 === n && 1 === a && 1 === h && 0 === c),
            i
        }
        static OrthoOffCenterLH(t, e, r, s, i, o, n) {
            const a = new x;
            return x.OrthoOffCenterLHToRef(t, e, r, s, i, o, a, n),
            a
        }
        static OrthoOffCenterLHToRef(t, e, r, s, i, o, n, a) {
            const h = 2 / (e - t),
                c = 2 / (s - r),
                _ = 2 / (o - i),
                u = -(o + i) / (o - i),
                l = (t + e) / (t - e),
                y = (s + r) / (r - s);
            return x.FromValuesToRef(h, 0, 0, 0, 0, c, 0, 0, 0, 0, _, 0, l, y, u, 1, n),
            a && n.multiplyToRef(d, n),
            n.markAsUpdated(),
            n
        }
        static OrthoOffCenterRH(t, e, r, s, i, o, n) {
            const a = new x;
            return x.OrthoOffCenterRHToRef(t, e, r, s, i, o, a, n),
            a
        }
        static OrthoOffCenterRHToRef(t, e, r, s, i, o, n, a) {
            return x.OrthoOffCenterLHToRef(t, e, r, s, i, o, n, a),
            n._m[10] *= -1,
            n
        }
        static PerspectiveLH(t, e, r, s, i, o = 0) {
            const n = new x,
                a = 2 * r / t,
                h = 2 * r / e,
                c = (s + r) / (s - r),
                _ = -2 * s * r / (s - r),
                u = Math.tan(o);
            return x.FromValuesToRef(a, 0, 0, 0, 0, h, 0, u, 0, 0, c, 1, 0, 0, _, 0, n),
            i && n.multiplyToRef(d, n),
            n._updateIdentityStatus(!1),
            n
        }
        static PerspectiveFovLH(t, e, r, s, i, o = 0, n = !1) {
            const a = new x;
            return x.PerspectiveFovLHToRef(t, e, r, s, a, !0, i, o, n),
            a
        }
        static PerspectiveFovLHToRef(t, e, r, s, i, o = !0, n, a = 0, h = !1) {
            const c = r,
                _ = s,
                u = 1 / Math.tan(.5 * t),
                l = o
                    ? u / e
                    : u,
                y = o
                    ? u
                    : u * e,
                m = h && 0 === c
                    ? -1
                    : 0 !== _
                        ? (_ + c) / (_ - c)
                        : 1,
                f = h && 0 === c
                    ? 2 * _
                    : 0 !== _
                        ? -2 * _ * c / (_ - c)
                        : -2 * c,
                R = Math.tan(a);
            return x.FromValuesToRef(l, 0, 0, 0, 0, y, 0, R, 0, 0, m, 1, 0, 0, f, 0, i),
            n && i.multiplyToRef(d, i),
            i._updateIdentityStatus(!1),
            i
        }
        static PerspectiveFovReverseLHToRef(t, e, r, s, i, o = !0, n, a = 0) {
            const h = 1 / Math.tan(.5 * t),
                c = o
                    ? h / e
                    : h,
                _ = o
                    ? h
                    : h * e,
                u = Math.tan(a);
            return x.FromValuesToRef(c, 0, 0, 0, 0, _, 0, u, 0, 0, -r, 1, 0, 0, 1, 0, i),
            n && i.multiplyToRef(d, i),
            i._updateIdentityStatus(!1),
            i
        }
        static PerspectiveFovRH(t, e, r, s, i, o = 0, n = !1) {
            const a = new x;
            return x.PerspectiveFovRHToRef(t, e, r, s, a, !0, i, o, n),
            a
        }
        static PerspectiveFovRHToRef(t, e, r, s, i, o = !0, n, a = 0, h = !1) {
            const c = r,
                _ = s,
                u = 1 / Math.tan(.5 * t),
                l = o
                    ? u / e
                    : u,
                y = o
                    ? u
                    : u * e,
                m = h && 0 === c
                    ? 1
                    : 0 !== _
                        ? -(_ + c) / (_ - c)
                        : -1,
                f = h && 0 === c
                    ? 2 * _
                    : 0 !== _
                        ? -2 * _ * c / (_ - c)
                        : -2 * c,
                R = Math.tan(a);
            return x.FromValuesToRef(l, 0, 0, 0, 0, y, 0, R, 0, 0, m, -1, 0, 0, f, 0, i),
            n && i.multiplyToRef(d, i),
            i._updateIdentityStatus(!1),
            i
        }
        static PerspectiveFovReverseRHToRef(t, e, r, s, i, o = !0, n, a = 0) {
            const h = 1 / Math.tan(.5 * t),
                c = o
                    ? h / e
                    : h,
                _ = o
                    ? h
                    : h * e,
                u = Math.tan(a);
            return x.FromValuesToRef(c, 0, 0, 0, 0, _, 0, u, 0, 0, -r, -1, 0, 0, -1, 0, i),
            n && i.multiplyToRef(d, i),
            i._updateIdentityStatus(!1),
            i
        }
        static PerspectiveFovWebVRToRef(t, e, r, s, i = !1, o, n = 0) {
            const a = i
                    ? -1
                    : 1,
                h = Math.tan(t.upDegrees * Math.PI / 180),
                c = Math.tan(t.downDegrees * Math.PI / 180),
                _ = Math.tan(t.leftDegrees * Math.PI / 180),
                u = Math.tan(t.rightDegrees * Math.PI / 180),
                l = 2 / (_ + u),
                y = 2 / (h + c),
                m = Math.tan(n),
                x = s._m;
            return x[0] = l,
            x[1] = x[2] = x[3] = x[4] = 0,
            x[5] = y,
            x[6] = 0,
            x[7] = m,
            x[8] = (_ - u) * l * .5,
            x[9] = -(h - c) * y * .5,
            x[10] = -r / (e - r),
            x[11] = 1 * a,
            x[12] = x[13] = x[15] = 0,
            x[14] = -2 * r * e / (r - e),
            o && s.multiplyToRef(d, s),
            s.markAsUpdated(),
            s
        }
        static GetFinalMatrix(t, e, r, s, i, o) {
            const n = t.width,
                a = t.height,
                h = t.x,
                c = t.y,
                _ = x.FromValues(n / 2, 0, 0, 0, 0, -a / 2, 0, 0, 0, 0, o - i, 0, h + n / 2, a / 2 + c, i, 1),
                u = new e.constructor;
            return e.multiplyToRef(r, u),
            u.multiplyToRef(s, u),
            u.multiplyToRef(_, u)
        }
        static GetAsMatrix2x2(t) {
            const e = t.m,
                r = [e[0], e[1], e[4], e[5]];
            return o.MatrixUse64Bits
                ? r
                : new Float32Array(r)
        }
        static GetAsMatrix3x3(t) {
            const e = t.m,
                r = [
                    e[0],
                    e[1],
                    e[2],
                    e[4],
                    e[5],
                    e[6],
                    e[8],
                    e[9],
                    e[10]
                ];
            return o.MatrixUse64Bits
                ? r
                : new Float32Array(r)
        }
        static Transpose(t) {
            const e = new t.constructor;
            return x.TransposeToRef(t, e),
            e
        }
        static TransposeToRef(t, e) {
            const r = e._m,
                s = t.m;
            return r[0] = s[0],
            r[1] = s[4],
            r[2] = s[8],
            r[3] = s[12],
            r[4] = s[1],
            r[5] = s[5],
            r[6] = s[9],
            r[7] = s[13],
            r[8] = s[2],
            r[9] = s[6],
            r[10] = s[10],
            r[11] = s[14],
            r[12] = s[3],
            r[13] = s[7],
            r[14] = s[11],
            r[15] = s[15],
            e.markAsUpdated(),
            e._updateIdentityStatus(t._isIdentity, t._isIdentityDirty),
            e
        }
        static Reflection(t) {
            const e = new x;
            return x.ReflectionToRef(t, e),
            e
        }
        static ReflectionToRef(t, e) {
            t.normalize();
            const r = t.normal.x,
                s = t.normal.y,
                i = t.normal.z,
                o = -2 * r,
                n = -2 * s,
                a = -2 * i;
            return x.FromValuesToRef(o * r + 1, n * r, a * r, 0, o * s, n * s + 1, a * s, 0, o * i, n * i, a * i + 1, 0, o * t.d, n * t.d, a * t.d, 1, e),
            e
        }
        static FromXYZAxesToRef(t, e, r, s) {
            return x.FromValuesToRef(t._x, t._y, t._z, 0, e._x, e._y, e._z, 0, r._x, r._y, r._z, 0, 0, 0, 0, 1, s),
            s
        }
        static FromQuaternionToRef(t, e) {
            const r = t._x * t._x,
                s = t._y * t._y,
                i = t._z * t._z,
                o = t._x * t._y,
                n = t._z * t._w,
                a = t._z * t._x,
                h = t._y * t._w,
                c = t._y * t._z,
                _ = t._x * t._w;
            return e._m[0] = 1 - 2 * (s + i),
            e._m[1] = 2 * (o + n),
            e._m[2] = 2 * (a - h),
            e._m[3] = 0,
            e._m[4] = 2 * (o - n),
            e._m[5] = 1 - 2 * (i + r),
            e._m[6] = 2 * (c + _),
            e._m[7] = 0,
            e._m[8] = 2 * (a + h),
            e._m[9] = 2 * (c - _),
            e._m[10] = 1 - 2 * (s + r),
            e._m[11] = 0,
            e._m[12] = 0,
            e._m[13] = 0,
            e._m[14] = 0,
            e._m[15] = 1,
            e.markAsUpdated(),
            e
        }
    }
    x._UpdateFlagSeed = 0,
    x._IdentityReadOnly = x.Identity();
    class f {}
    f.Vector3 = r.BuildTuple(11, l.Zero),
    f.Matrix = r.BuildTuple(2, x.Identity),
    f.Quaternion = r.BuildTuple(3, m.Zero);
    class R {}
    R.Vector2 = r.BuildTuple(3, u.Zero),
    R.Vector3 = r.BuildTuple(13, l.Zero),
    R.Vector4 = r.BuildTuple(3, y.Zero),
    R.Quaternion = r.BuildTuple(2, m.Zero),
    R.Matrix = r.BuildTuple(8, x.Identity),
    i("BABYLON.Vector2", u),
    i("BABYLON.Vector3", l),
    i("BABYLON.Vector4", y),
    i("BABYLON.Matrix", x);
    const d = x.FromValues(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, .5, 0, 0, 0, .5, 1)
})();