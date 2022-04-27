function test3(){
  console.log('test3 function')
}
export default test3

//正确
export default function test1 () {
  console.log('test1 function')
}
//正确
export function test2 () {
  console.log('test2 function')
}
