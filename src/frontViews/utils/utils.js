// 毫秒转分秒显示
export const transformTime = (time) => {
    return  String(Math.floor(time/1000/60)).padStart(2, '0') + ':' + String(Math.floor(time/1000)%60).padStart(2, '0');
}