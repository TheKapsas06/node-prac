// Function for error handleing. This allows it to be modified in the future
function handleError(err) {
    if (err) throw err;
}
exports.handleError = handleError;

function outLog(message){
    let timeStamp = new Date().toISOString();
    console.log(`[${timeStamp}]: ${message}`)
}
exports.outLog = outLog;