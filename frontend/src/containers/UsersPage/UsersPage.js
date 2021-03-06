import React, {Component} from 'react';
import {connect} from "react-redux";
import {deletePicture, getUsersPictures} from "../../store/actions/picturesActions";
import Grid from "@material-ui/core/Grid";
import MediaCard from "../../components/Card/Card";
import {apiURL} from "../../constants";
import store from "../../store/configureStore";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

class UsersPage extends Component {
    state ={
        owner: ''
    };
    componentDidMount() {
        this.props.getUsersPictures(this.props.match.params.id).then(() => {
            this.setState({owner: this.props.pictures[0].author.displayName || this.props.pictures[0].author.username})
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.getUsersPictures(this.props.match.params.id);
        }
    }

    render() {
        return (
            <Grid container justify="center">
                <Grid item xs={12} md={10} lg={4}>
                    <Box pt={2} pb={2}>
                        <Typography variant="h4">{this.state.owner}'s Gallery</Typography>
                    </Box>
                    <Grid container direction="column" spacing={10}>
                        <Grid item xs>
                            {(this.props.match.params.id === store.getState().users.user._id) &&
                            <Button color="primary" variant="contained" component={Link} to="/newPicture">
                                Add Picture
                            </Button>}
                        </Grid>
                        {this.props.pictures.map(picture => (
                            <Grid item xs key={picture._id}>
                                <MediaCard
                                    id={picture._id}
                                    delete={this.props.deletePicture}
                                    image={apiURL + '/' + picture.image}
                                    title={picture.title}
                                    author={picture.author.displayName || picture.author.username}
                                    authorId={picture.author._id}
                                    userId={store.getState().users.user._id}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    pictures: state.pictures.usersPictures
});

const mapDispatchToProps = dispatch => ({
    getUsersPictures: id => dispatch(getUsersPictures(id)),
    deletePicture: (id, picId) => dispatch(deletePicture(id, picId))
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);