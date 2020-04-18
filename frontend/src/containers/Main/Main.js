import React, {Component} from 'react';
import {getPictures} from "../../store/actions/picturesActions";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import {apiURL} from "../../constants";
import MediaCard from "../../components/Card/Card";

class Main extends Component {
    componentDidMount() {
        this.props.getPictures();
    }

    render() {
        return (
            <>
                <Grid container justify="center">
                    <Grid item xs={12} md={10} lg={4}>
                        <Grid container direction="column" spacing={10}>
                            {this.props.pictures.map(picture => (
                                <Grid item xs key={picture._id}>
                                    {/*<a href={apiURL + '/' + picture.image}>*/}
                                    {/*    <img*/}
                                    {/*        src={apiURL + '/' + picture.image}*/}
                                    {/*        alt={picture.title}*/}
                                    {/*        style={{height: '100px', width: '100px'}}*/}
                                    {/*    />*/}
                                    {/*</a>*/}
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
            </>
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