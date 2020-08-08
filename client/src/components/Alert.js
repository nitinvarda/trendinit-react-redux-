import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => alerts != null && alerts.length > 0 && alerts.map(alert => (
    <div className={"bg-" + alert.alertType} style={{ width: '100%', margin: 'auto', marginTop: 80, textAlign: "center" }}>
        {alert.msg}
    </div>
))



Alert.propTypes = {
    alert: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    alerts: state.alert

});
export default connect(mapStateToProps)(Alert);
