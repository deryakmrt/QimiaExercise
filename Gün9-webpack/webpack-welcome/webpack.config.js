module.exports = {
   entry: {
       index: './src/index.js'
   },
   output: {
       filename: 'bundle.[chunkhash].js',
       // chunckhash -> webpack çalıştığında ortaya çıkacak olan dosyanın her seferinde farklı bir hash id ile çıkmasını sağlamaktadır.
       path: __dirname + '/dist'
       // dist klasörü altında directory name ile dosyaların oluşmasını sağlamaktadır.
   }
}