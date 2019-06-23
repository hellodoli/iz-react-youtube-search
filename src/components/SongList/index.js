import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectSong } from '../../actions';

class SongList extends Component {

    render() {
        const songs = this.props.songs;
        const selectedSong = this.props.selectedSong;
        return(
            <div>
                { 
                    songs.map(song => (
                        <div key={song.title} style={{ marginTop: '10px' }}>
                            <div>
                                <div>{ song.title }</div>
                                <div>{ song.duration }</div>
                            </div>
                            <button 
                                onClick={() => this.props.selectSong(song)}>
                                Select
                            </button>
                        </div>
                    ))
                }
                <div>Your select song is: { selectedSong != null && selectedSong.title } </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        songs: state.songsReducer,
        selectedSong: state.selectedSongReducer
    };
}

export default connect(
    mapStateToProps,
    { selectSong }
)(SongList);
