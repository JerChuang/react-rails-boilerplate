import React, { Component } from 'react';
import { Icon } from 'antd';
import axios from 'axios';
class AdminActivities extends Component {
    state = {
        activities: [],
    }
    
    componentDidMount () {
        this.fetchActivities()
    }
    
    fetchActivities = () => {
        axios.get('/api/admin/activities', {})
            .then((response) => {
                console.log('responsedata',response.data)
                this.setState({
                    activities: response.data.activities
                })
            })
        }

        // delete an exisiting activity by clicking trash button
        onDelete = (event) => {
            axios.delete(`/api/admin/categories/${event.currentTarget.id}`, {})
                .then((response) => {
                    this.fetchCategories()
                })
        }
    


    render() {
        console.log('thestate',this.state)
        const activities = this.state.activities.map(activity => {
        return <tr>
        {activity.name} 
        <Icon type="edit" /> 
        <Icon type="delete" className="activityDeleteIcon" onClick={this.onDelete} />
        </tr>   
        })
        return (
            <div className="adminActivities">

                <table className="tableAdminActivities">
                    <thead>
                        <tr>
                        <th colSpan="2">Activity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities}
                    </tbody>
                </table>

            </div>
        )
    }
}

export default AdminActivities

