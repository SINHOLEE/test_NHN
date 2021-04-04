
export function createCounter(option={
  initVal:0,
  min:Number.MIN_SAFE_INTEGER,
  max:Number.MAX_SAFE_INTEGER
}) {
  const privateParams = {...option}
  return {
    val() {
      return privateParams.initVal
    },
    inc() {
      if(!this.isMax()){
        privateParams.initVal++
      }
      return privateParams.initVal
      
      
    },
    dec() {
      if(!this.isMin()){
        privateParams.initVal--
      }
      return privateParams.initVal
        
      
    },
    isMax(){
      return privateParams.max <= privateParams.initVal
    },
    isMin(){
      return privateParams.min >= privateParams.initVal
    }
  };
}
