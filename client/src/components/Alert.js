import React from 'react';

import { connect } from 'react-redux';


// this is stateless functional component which handle errors
const Alert = ({ alerts }) => alerts != null && alerts.length > 0 && alerts.map(alert => (
    <div className={"bg-" + alert.alertType} style={{ width: '100%', margin: 'auto', marginTop: 80, textAlign: "center" }}>
        {alert.msg}
    </div>
))




// bringing state to props
const mapStateToProps = (state) => ({
    alerts: state.alert

});
export default connect(mapStateToProps)(Alert);
