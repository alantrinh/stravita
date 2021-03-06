import React from 'react';
import {Link} from 'react-router';
import axios from './../axios';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLocationEditor: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.showLocationEditor = this.showLocationEditor.bind(this);
        this.updateLocation = this.updateLocation.bind(this);
        this.uploadProfileImage = this.uploadProfileImage.bind(this);
        this.deleteProfileImage = this.deleteProfileImage.bind(this);
    }

    componentDidMount() {
        axios.get('/athletes').then((resp) => {
            this.setState(resp.data);
            if (this.state.imageUrl == null) {
                this.setState({imagUrl: '/public/images/profile_placeholder.jpg'});
            }
            axios.get(`/getUserActivitySummary?id=${this.state.id}`).then((resp) => {
                this.setState(resp.data.data);
            });
        });
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    showLocationEditor() {
        this.setState(prevState => ({
            showLocationEditor: !prevState.showLocationEditor
        }));
    }

    updateLocation(e) {
        e.preventDefault();
        const {city, state, country} = this.state;
        axios.post('/updateLocation', {
            city, state, country
        }).then(() => {
            this.showLocationEditor();
        });
    }

    uploadProfileImage(e) {
        var formData = new FormData();
        formData.append('file', e.target.files[0]);

        axios.post('/uploadProfileImage', formData).then((resp) => {
            this.setState({imageUrl: resp.data.imageUrl});
            this.props.setImage(resp.data.imageUrl);
        }).catch((err) => {
            console.log(err);
        });
    }

    deleteProfileImage() {
        axios.post('/deleteProfileImage').then(() => {
            this.setState({imageUrl: '/public/images/profile_placeholder.jpg'});
            this.props.setImage('');
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <div id='profile-wrapper'>
                <div>
                    <div id='profile-image-container'>
                        <img className='profile-image' src={this.state.imageUrl ? this.state.imageUrl : '/public/images/profile_placeholder.jpg'} />
                        <div>
                            <label htmlFor='profile-image-input'>Update profile image</label><br />
                            {this.state.imageUrl && <span id='profile-image-delete' onClick={this.deleteProfileImage}>Delete profile image</span>}
                        </div>
                    </div>
                    <input type='file' id='profile-image-input' onChange={this.uploadProfileImage} />

                    <div className='profile'>
                        <h2>{this.state.firstName} {this.state.lastName}</h2>
                        {this.state.showLocationEditor ?
                            (<form>
                                <input type='text' name='city' placeholder='city' value={this.state.city} onChange={this.handleChange}></input>
                                <input type='text' name='state' placeholder='state' value={this.state.state} onChange={this.handleChange}></input>
                                <input type='text' name='country' placeholder='country' value={this.state.country} onChange={this.handleChange}></input>
                                <br />
                                <button type='submit' onClick={this.updateLocation}>Save</button>
                            </form>)
                            :
                            (<p>
                                {this.state.city || this.state.state || this.state.country ?
                                    (<div className='location-profile'>
                                        {this.state.city}{this.state.city && this.state.state && ', '}{this.state.state}{(this.state.city || this.state.state) && ', '}{this.state.country}
                                        <p><button onClick={this.showLocationEditor}>Edit location</button></p>
                                    </div>)
                                    :
                                    <button onClick={this.showLocationEditor}>Add your location details</button>}
                            </p>)
                        }
                    </div>
                </div>
                <div id='profile-activity-count'>
                    <h2>{this.state['activity_count']}</h2>
                    <span id='profile-total-activities'>Total Activities</span>
                </div>
            </div>
        );
    }
}
