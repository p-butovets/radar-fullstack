import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
// import M from 'materialize-css';

const createRoutineMachineLayer = (props) => {

    const { waypoints } = props;

    const instance = L.Routing.control({
        waypoints: waypoints
    });

    // instance.on('routesfound', (e) => {
    //     let routes = e.routes;
    //     let summary = routes[0].summary;
    //     const duration = Math.round(summary.totalTime % 3600 / 60)
    //     let toastHTML = `<span style="color: white">До останньої адреси ${duration} хв.</span>`;
    //     M.toast({ html: toastHTML, timeRemaining: 10000 });
    // });


    return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;