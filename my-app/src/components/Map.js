import React, { useState } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import "./styles.css"
// import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'




class MapComponent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      latitude: 39.8283,
      longitude: -98.5795,
      latitudeInput: 39.8283,
      longitudeInput: -98.5795,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(typeof this.state.longitude)
  }

  handleChange(event){
    console.log("here")
    const {name, value} = event.target

    this.setState({
      [name] : value
    })
  }

  handleSubmit(){
    if(this.state.latitude !== null && this.state.longitude !== null && this.state.latitudeInput !== 0 && this.state.longitude !== 0){
      console.log("updating")
      this.setState({
        latitude: this.state.latitudeInput,
        longitude: this.state.longitudeInput
      });
    }
  }
  

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="number" name="latitudeInput" value={this.state.latitudeInput} placeholder="Latitude" onChange={this.handleChange}/>
          <input type="number" name="longitudeInput" value={this.state.longitudeInput} placeholder="Longitude" onChange={this.handleChange}/>
          <br></br>
          <button type="submit">Submit</button>
        </form>
        <Map latitude={this.state.latitude} longitude={this.state.longitude}/> 
      </div>
    );
  }
  
}




class Map extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      viewport:  {
        width: 1118,
        height: 478,
        latitude: props.latitude,
        longitude: props.longitude,
        zoom: 4
        }
      }
      this.handleViewportChange = this.handleViewportChange.bind(this);
  }

  handleViewportChange = (viewport) => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }

  componentDidUpdate(prevProps) {
    console.log(this.props)
    console.log(prevProps)
    // Typical usage (don't forget to compare props):
    if ((this.props.latitude != prevProps.latitude || this.props.longitude != prevProps.longitude)) {
      console.log("hre")
      this.handleViewportChange(prevProps)
    } else {
      console.log("not")
    }
  }

  render(){
    return(
        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={this.handleViewportChange}
          mapboxApiAccessToken='pk.eyJ1IjoidGF5eWFiZGV2IiwiYSI6ImNrN2M0NW13ODBoMnIzbHFoYmR1Y2ZjdDYifQ.jNx0hMccnFqRtzvck4PLJQ'
          mapStyle='mapbox://styles/tayyabdev/ck7cc1mqe0bwm1is2mhq1k9qe'
          // mapStyle='mapbox://styles/mapbox/light-v10'
        >
          <Marker latitude={37.78} longitude={-122.41}>
            <button className="marker-btn">
              <img src="https://clipartart.com/images/google-maps-marker-transparent-clipart.png" alt="Marker"/>
            </button>
          </Marker>
        </ReactMapGL>
      );
  }


}


// function Map(props) {
//   const [viewport, setViewport] = useState({
//     width: 1118,
//     height: 478,
//     latitude: props.latitude,
//     longitude: props.longitude,
//     zoom: 4
//   }); 


//   return (
//     <ReactMapGL
//       {...viewport}
//       onViewportChange={viewport => {
//         setViewport(viewport)
//       }}
//       mapboxApiAccessToken='pk.eyJ1IjoidGF5eWFiZGV2IiwiYSI6ImNrN2M0NW13ODBoMnIzbHFoYmR1Y2ZjdDYifQ.jNx0hMccnFqRtzvck4PLJQ'
//       mapStyle='mapbox://styles/tayyabdev/ck7cc1mqe0bwm1is2mhq1k9qe'
//       // mapStyle='mapbox://styles/mapbox/light-v10'
//     >
//       <Marker latitude={37.78} longitude={-122.41}>
//         <button className="marker-btn">
//           <img src="https://clipartart.com/images/google-maps-marker-transparent-clipart.png" alt="Marker"/>
//         </button>
//       </Marker>
//     </ReactMapGL>
//   );
// }

export default MapComponent