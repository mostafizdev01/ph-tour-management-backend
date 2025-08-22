export const getTransactionId = () => {
    return `tran_${Date.now()}_${Math.floor(Math.random() * 1000)}`
}

/// upore payment er jonno ekta fake transition id create kora hoise
// 1. tran => text ta add kora hoise
// 2. Date.now() => ekta string version er number genarate kora hoise
// 3. Math.floor => 1-9 porjonto ekta number select kora hoise
// 4. Math.random => Math.floor number er sate * 1000 kore ekta number genarate kora hoise. Exampel:- 5 * 1000 = 5000
// result => sob gula milaiya ekta transion id create kora hoise