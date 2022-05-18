const BASE_URL = 'http://localhost:8000'
//fetching planets for launch form
async function httpGetPlanets() {
  let req = await fetch(`${BASE_URL}/planets`);
  let data = await req.json()
  return data
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  let req = await fetch(`${BASE_URL}/launches`);
  let data = await req.json();
  return data
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try{
    await fetch(`${BASE_URL}/launches`,{
      method: 'POST' ,
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify(launch)
    });
    return true;
  }catch(err){
    return false;
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    await fetch(`${BASE_URL}/launches/${id}`,{
      method: 'DELETE'
    });
    return true;
  } catch (error) {
    return false
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};