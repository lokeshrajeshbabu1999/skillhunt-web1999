import { logger } from "react-native-logs";

const log = logger.createLogger({
    levels: {
        custom: 0,
        debug: 1,
        info: 2,
        warn: 3,
        error: 4,
        devNotice: 5,
    },
    transportOptions: {
        colors: {
            custom: "white",
            devNotice: "blue",
            info: "blueBright",
            warn: "redBright",
            error: "greenBright",
            debug: "white",
        },
    },
});
log.debug("We are testing in App.js");
log.error("this is a erreo");
log.warn("this is a warning");
log.info("this is a info");

export default log;