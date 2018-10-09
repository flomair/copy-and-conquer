import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {treeFetch} from "src/redux/tree/actions";
import $template$ from "./inner";



export default connect( null, (dispatch: any) =>bindActionCreators({treeFetch},dispatch))($template$);
//export default  Search