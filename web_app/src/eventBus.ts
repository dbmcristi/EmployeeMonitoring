import PubSub from "pubsub.js";

export interface EventBusServiceParams {
    serviceName: string;
    description: string;
}

export const eventBusServiceParams: EventBusServiceParams = {
    serviceName: "BranchDesktopEventbus",
    description: "Eventbus for Branch Desktop Micro-frontends"
};

export class EventBusService {
    constructor(eventBusServiceParams: EventBusServiceParams) {
        PubSub.publish(
            eventBusServiceParams.serviceName,
            eventBusServiceParams.description
        );
    }
}
// create a function to subscribe to topics
const mySubscriber = function (msg, data) {
    console.log(msg, data);
};

// add the function to the list of subscribers for a particular topic
// we're keeping the returned token, in order to be able to unsubscribe
// from the topic later on
const token = PubSub.subscribe("", mySubscriber);

// publish a topic asynchronously
PubSub.publish("MY TOPIC", "hello world!");
