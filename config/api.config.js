const isPro = Object.is(process.env.NODE_ENV, 'production')

console.log(isPro);

module.exports = {
    // baseUrl: isPro ? 'https://www.***/index.php/Official（线上地址）' : '/api' // 处理跨域
    baseUrl: "http://10.15.208.119" //"https://digital.tq-service.com/tqdata" // 10.15.208.119  // "http://152.136.98.58:8092
}