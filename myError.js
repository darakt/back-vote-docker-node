
const myError = (code=0, message='N.A', stack='N.A', caller='Impossible') => {
    // Error log is managed here
    console.log('code : ', code);
    console.log('message : ', message);
    console.log('stack : ', stack);
    console.log('created by : ', caller)
    return {
        code,
        message,
        stack,
        caller
    };
}
export default myError;