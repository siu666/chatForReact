export function getRedirectPath(type,avatar){
          console.log(type.type)
          let url=(type.type=='boss')?'/boss':'/genius'
          if(!type.avatar){
              url=url+'info'
          }
          return url
}
export function getChatId(userId,targetId) {
    return [userId,targetId].sort().join('_')

}