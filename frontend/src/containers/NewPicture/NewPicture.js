import React, {Component} from 'react';
import {postPicture} from "../../store/actions/picturesActions";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import FormElement from "../../components/UI/Form/FormElement";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert/Alert";

class NewPicture extends Component {
    state = {
        title: '',
        image: ''
    };

    inputChangeHandler = e => {
        this.setState({title: e.target.value});
    };

    fileChangeHandler = e => {
        this.setState({[e.target.name]: e.target.files[0]});
    };

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            let value = this.state[key];

            formData.append(key, value);
        });

        this.props.postPicture(formData);
    };
    render() {
        return (
            <form onSubmit={this.submitFormHandler}>
                {this.props.error && (
                    <Grid item xs>
                        <Alert severity="error">{this.props.error}</Alert>
                    </Grid>
                )}
                <Grid container direction="column" spacing={2}>
                    <Grid item xs>
                        <FormElement
                            type="text"
                            propertyName="title" required
                            title="Title"
                            onChange={this.inputChangeHandler}
                            value={this.state.title}
                        />
                    </Grid>
                    <Grid item xs>
                        <FormElement
                            type="file"
                            propertyName="image"
                            title="Image"
                            onChange={this.fileChangeHandler}
                        />
                    </Grid>
                    <Grid item xs>
                        <Button type="submit" color="primary" variant="contained">Save</Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    error: state.pictures.error
});

const mapDispatchToProps = dispatch => ({
    postPicture: picture => dispatch(postPicture(picture))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPicture);