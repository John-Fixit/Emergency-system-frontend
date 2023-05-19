// import React, { useEffect } from 'react'
// function USSD() {
//   useEffect(()=>{
//     const pusher = new Pusher('PusherKey',{
//         cluster:'PusherCluster',
//         encrypted:true
//     })
//     const channel = pusher.subscribe('orders')
//     channel.bind('customerOrder', (data) => {
//         console.log(data)
//         this.orders.push(data)
//     })
//   }, [])

//   const orders = [
//     {name:"Chris Nwamba", description:"Rice and Ofe-Akwu", address:"Lekki", telephone:"08082092001", open:true},
//     {name:"William Imoh", description:"Rice and Chicken", address:"Amuwo", telephone:"08082818700", open:true},
//     {name:"Mary-Anne Unoka", description:"Yam and Egg Sauce", address:"Satellite Town", telephone:"08083872501", open:true},
//     {name:"Ralph Ugwu", description:"Rice and Salad", address:"Nsukka", telephone:"08082983021", open:true},
//     {name:"BLAQLSG Imoh", description:"Cake and Sprite", address:"Ije-Ododo", telephone:"08082869830", open:true}
// ]

  
//       const close=(orderToClose)=>{
//           if ( window.confirm('Are you sure you want to close the order?') === true){
//               this.orders = this.orders.map(order => {
//                   if(order.name !== orderToClose.name && order.description !== orderToClose.description){
//                       return order;
//                   }
//                   const change = Object.assign(order, {open: !order.open})
//                   return change;
//               })
//           } 
//       }

//   return (
//     <>
//         <div class="row">
//            {
//             orders.map((order,index)=>(
//              <div class="col-md-4 order-card">
//              <h3 title="Customer Name">{order.name}</h3>
//              <span class="closeicon" onClick={()=>close(order)} title="Close Order">X</span>
//              <p title="Order Description">{order.description}</p>
//              <p title="Customer Address">{order.address}</p>
//              <p title="Customer Telephone">{order.telephone}</p>
//              </div>
//             ))
//            }
//         </div>
//     </>
//   )
// }

// export default USSD