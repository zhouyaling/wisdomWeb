const isPro = Object.is(process.env.NODE_ENV, 'production')

console.log(isPro);

module.exports = {
    // baseUrl: isPro ? 'https://www.***/index.php/Official（线上地址）' : '/api' // 处理跨域
    baseUrl: "https://digital.tq-service.com/tqdata"
}