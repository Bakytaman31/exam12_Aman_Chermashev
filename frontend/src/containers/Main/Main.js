import React, {Component} from 'react';
import {getPictures} from "../../store/actions/picturesActions";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import {apiURL} from "../../constants";
import MediaCard from "../../components/Card/Card";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

class Main extends Component {
    componentDidMount() {
        this.props.getPictures();
    }

    render() {
        return (
            <Grid container justify="center">
                <Grid item xs={12} md={10} lg={4}>
                    <Box pt={2} pb={2}>
                        <Typography variant="h4">Gallery</Typography>
                    </Box>
                    <Grid container direction="column" spacing={10}>
                        {this.props.pictures.map(picture => (
                            <Grid item xs key={picture._id}>
                                <MediaCard
                                    image={apiURL + '/' + picture.image}
                                    title={picture.title}
                                    author={picture.author.displayName || picture.author.username}
                                    authorId={picture.author._id}
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
    pictures: state.pictures.pictures
});

const mapDispatchToProps = dispatch => ({
    getPictures: () => dispatch(getPictures())
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);