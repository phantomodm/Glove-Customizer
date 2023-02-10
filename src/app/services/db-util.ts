


export function convertSnaps<T>(results: any)  {
  return <T[]> results.docs.map((snap: any) => {
      return {
          id: snap.id,
          ...<any>snap.data()
      }
  })
}

// export function convertTimestamp(stamp?:Date){
//   if(!stamp){
//     const timestamp = new Date();
//     return Timestamp.fromDate(timestamp);
//   } else {
//     return Timestamp.fromDate(stamp)
//   }
// }
