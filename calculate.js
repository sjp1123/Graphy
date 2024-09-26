function calc(arr) {
    var finalCoeffs = Array(arr.length);
    for (var i = 0; i < arr.length; i++) {
        finalCoeffs[i] = [0, 1];
    }
    for (var i = 0; i < arr.length; i++) {
        var coeff = 1;
        for (var j = 0; j < arr.length; j++) {
            if (i == j) continue;
            if (arr[i][0] == arr[j][0]) {
                alert("같은 x값이 있으면 안됩니다.");
                return null;
            }
            coeff *= arr[i][0] - arr[j][0];
        }
        let coeffs = getCoeff(arr, i);
        for (var j = 0; j < coeffs.length; j++) {
            finalCoeffs[j] = RTCD(finalCoeffs[j], [
                coeffs[j] * arr[i][1],
                coeff,
            ]);
        }
    }
    return finalCoeffs;
}

function getCoeff(arr, ex) {
    // ex : 제외 상수항
    let coeffs = Array(arr.length);
    coeffs[0] = 1;
    for (var i = 1; i < arr.length; i++) {
        // i: 재귀 깊이
        coeffs[i] = recur(arr, ex, 0, 0, i, 1);
    }
    return coeffs;
}

function recur(arr, ex, idx, k, K, now) {
    // now: 현재 계산값
    if (k == K) return now;
    var s = 0;
    for (var i = idx; i < arr.length; i++) {
        if (i == ex) continue;
        s += recur(arr, ex, i + 1, k + 1, K, now * -arr[i][0]);
    }
    return s;
}

function RTCD(b1, b2) {
    // 통분 후 덧셈 후 약분
    var bunja = b1[0] * b2[1] + b2[0] * b1[1];
    var bunmo = b1[1] * b2[1];
    return Reduction(bunja, bunmo);
}

function Reduction(bunja, bunmo) {
    // 약분 함수
    var a = Math.max(bunja, bunmo);
    var b = Math.min(bunja, bunmo);

    while (b != 0) {
        n = a % b;
        a = b;
        b = n;
    }
    let gcd = a;

    bunja /= gcd;
    bunmo /= gcd;
    if (bunmo < 0) {
        // 분모 양수로(0 이상)
        bunmo = -bunmo;
        bunja = -bunja;
    }

    return [bunja, bunmo];
}