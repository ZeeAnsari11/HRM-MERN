// import net from 'net'

// const socket = new net.Socket();

// export default socket.connect({
//   host: '72.255.38.48',
//   port: 4370
// }, () => {
//   console.log('Connected to ZK device!');
// });

// socket.on('error', (error) => {
//   console.error(error);
// });

// socket.on('close', () => {
//   console.log('Disconnected from ZK device.');
// });

// // export const userData = zk.getUser('1', (err, user) => {
// //     if (err) {
// //       console.error("-------------2----",err);
// //     } else {
// //       console.log("-------------user-----------",user);
// //     }
// //   });

// import zklib from 'node-zklib';

// const zk = new zklib('72.255.38.48', 4370, 3000);
// console.log("=========ck===========",zk);

// export default zk.connect((err) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('Connected to device');
//   }
// });
// import net from 'net';
// import zklib from 'node-zklib';

// const zk = new zklib(null, null, null); // create zklib instance with null parameters

// const socket = new net.Socket(); // create a new socket instance

// export default socket.connect(4370, '72.255.38.48', () => { // connect to the device's IP and port
//   console.log('Connected to device');
//   console.log("========================1==============");
//   zk.socket = socket; // set the zklib instance's socket property to the created socket
//   console.log("========================2==============",zk);
//   zk.connect((err) => { // use the zklib instance to connect to the device
//   console.log("========================3==============");
//     if (err) {
//       console.error("=================",err);
//     } else {
//   console.log("========================4==============");
//       console.log('Successfully connected to device');
//     }
//   });
// });

// import the required modules




// import net from 'net';
// import zklib from 'node-zklib';

// // create the socket
// const socket = new net.Socket();

// // set up the connection parameters
// const zk = new zklib({
//     ip: '72.255.38.48',
//     port: 4370,
//     inport: 5200,
//     timeout: 5000,
//     isUDP: false,
//     socket: socket
// });

// zk.socket = socket;
// // connect to the device
// export default zk.socket.connect({
//     port: zk.port,
//     host: zk.ip
// }, function () {
//     console.log('Connected to the device.');
//     // enable the device
//     zk.enableDevice(function (err, result) {
//         if (err) {
//             console.error('Failed to enable device:', err);
//         } else {
//             console.log('Device enabled:', result);
//         }
//     });
// });


// -------------------------------------
// import net from 'net';
// import zklib from 'node-zklib';

// // create the socket
// const socket = new net.Socket();

// // set up the connection parameters
// const zk = new zklib({
//     ip: '72.255.38.48',
//     port: 4370,
//     inport: 5200,
//     timeout: 9000,
//     isUDP: false,
//     socket: socket
// });

// zk.socket = socket;

// // connect to the device
// export default zk.socket.connect({port: "4370", ip: "72.255.38.48"}, function() {
//     console.log("================called===================");
//     console.log('Connected to the device.');
//     // enable the device
//     zk.enableDevice(function (err, result) {
//       if (err) {
//         console.error('Failed to enable device:', err);
//       } else {
//         console.log('Device enabled:', result);
//       }
//     });
//   }).on('error', function(err) {
//     console.error('Socket error:', err);
//   });

// export default zk;

// ------------------------------
// import net from 'net';
// import zklib from 'node-zklib';

// // create the socket
// const socket = new net.Socket();

// // set up the connection parameters
// const zk = new zklib({
//   ip: '72.255.38.48',
//   port: 4370,
//   inport: 5200,
//   timeout: 9000,
//   isUDP: false,
//   socket: socket
// });

// zk.socket = socket;

// connect to the device
// zk.socket.connect({port: "4370", ip: "72.255.38.48"}, function() {
//     console.log("================called===================");
//     console.log('Connected to the device.');
//     // enable the device
//     zk.enableDevice(function (err, result) {
//         if (err) {
//             console.error('Failed to enable device:', err);
//         } else {
//             console.log('Device enabled:', result);
//         }
//     });
// }).on('error', function(err) {
//     console.error('Socket error:', err);
// });

// import net from 'net';
// import zklib from 'node-zklib';

// const socket = new net.Socket();

// const zk = new zklib({
//   ip: '72.255.38.48',
//   port: 4370,
//   inport: 5200,
//   timeout: 9000,
//   isUDP: false,
//   socket: socket
// });
// zk.socket = socket;


// // connect to the device
// export default zk.socket.connect({
//   port: 4370,
//   host: '72.255.38.48'
// }, () => {
//   console.log('Connected to ZK device!');
// });

// socket.on('error', (error) => {
//   console.error('Error:', error);
// });

// socket.on('close', () => {
//   console.log('Disconnected from ZK device.');
// });

// import net from "net"
// const socket = new net.Socket();

// // connect to the device
// export default socket.connect({
//   host: '72.255.38.48',
//   port: 4370 ,
// });

// // handle socket events
// socket.on('connect', () => {
//   console.log('Connected to device');
// });

// socket.on('data', (data) => {
//   console.log(`Received data: ${data}`);
// });

// socket.on('close', () => {
//   console.log('Socket closed');
//   socket.on('connect', () => {
//     console.log('Connected to device');
//   });
// });

// socket.on('error', (error) => {
//   console.error(`Socket error: ${error}`);
// });

// // send data to the device
// const message = 'Hello, device!';
// socket.write(message);
// =====================================================================================

import net from "net";
import zklib from "node-zklib";

const socket = new net.Socket();

const zk = new zklib();

zk.socket = socket;

export default socket.connect({
  port: 4370,
  host: "72.255.38.48"
});

zk.socket.on("error", (error) => {
  console.error("Error:", error);
});
socket.on("close", () => {
  console.log("Disconnected from ZK device.");
});
socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

socket.on("connect", () => {
  console.log("Connected to ZK device!");
  zk.getUsers()
  .then((res)=>{
    console.log("==============",res)
  })
  .catch((err)=>{
    console.log("===============erroor si s=======",err);
  })
});

