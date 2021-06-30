import React, { Component } from "react";
import './App.css';
import Subject from "./components/Subject";
import TOC from "./components/TOC";
import Control from "./components/Control";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";

class App extends Component {
    constructor(props) {
        super(props);
        this.max_content_id = 3;
        this.state = {
            mode: "welcome",
            selected_content_id: 2,
            subject: {title: "WEB", sub: "World Wide Web!"},
            welcome: {title: "Welcome", desc: "Hello, React!!"},
            contents: [
                {id: 1, title: "HTML", desc: "HTML is for information"},
                {id: 2, title: "CSS", desc: "CSS is for design"},
                {id: 3, title: "JavaScript", desc: "JavaScript is for interactive"}
            ]
        };
    }

    getReadContent() {
        let i = 0;
        while (i < this.state.contents.length) {
            let data = this.state.contents[i]
            if (data.id === this.state.selected_content_id) {
                return data;
            }
            i = i + 1;
        }
    }

    getContent() {
        let _title, _desc, _content, _article = null;
        if (this.state.mode === 'welcome') {
            _title = this.state.welcome.title;
            _desc = this.state.welcome.desc;
            _article = <ReadContent title={_title} desc={_desc} />
        } else if (this.state.mode === 'read') {
            _content = this.getReadContent();
            _article = <ReadContent title={_content.title} desc={_content.desc} />
        } else if (this.state.mode === 'create') {
            _article = <CreateContent onSubmit={
                function (_title, _desc) {
                    this.max_content_id = this.max_content_id + 1;
                    /*let _contents = this.state.contents.concat(
                        {
                            id: this.max_content_id,
                            title: _title,
                            desc: _desc
                        }
                    )*/
                    let newContents = Array.from(this.state.contents);
                    newContents.push({
                        id: this.max_content_id,
                        title: _title,
                        desc: _desc
                    });
                    this.setState({
                        contents: newContents,
                        mode: 'read',
                        selected_content_id: this.max_content_id
                    })
                }.bind(this)}
            />
        } else if (this.state.mode === 'update') {
            _content = this.getReadContent();
            _article = <UpdateContent data={_content} onSubmit={
                function (_id, _title, _desc) {
                    let updateContents = Array.from(this.state.contents);
                    let i = 0;
                    while (i < updateContents.length) {
                        if (updateContents[i].id === _id) {
                            updateContents[i] = {id: _id, title: _title, desc: _desc};
                            break;
                        }
                        i = i + 1;
                    }
                    this.setState({
                        contents: updateContents,
                        mode: 'read'
                    })
                }.bind(this)}
            />
        }
        return _article;
    }

    render() {
        return (
            <div className="App">
                <Subject
                    title={this.state.subject.title}
                    sub={this.state.subject.sub}
                    onChangePage={function () {
                        this.setState({
                            mode: 'welcome'
                        });
                    }.bind(this)}
                />
                <TOC onChangePage={function (id) {
                    this.setState({
                        mode: 'read',
                        selected_content_id: Number(id)
                    });
                }.bind(this)}
                data={this.state.contents} />
                <Control onChangeMode={function (_mode) {
                    if (_mode === 'delete') {
                        if (window.confirm('really?')) {
                            let _contents = Array.from(this.state.contents)
                            let i = 0;
                            while (i < _contents.length) {
                                if (_contents[i].id === this.state.selected_content_id) {
                                    _contents.splice(i, 1);
                                    break;
                                }
                                i = i + 1;
                            }
                            this.setState({
                                mode: 'welcome',
                                contents: _contents
                            });
                            alert('deleted!');
                        }
                    } else {
                        this.setState({mode: _mode})
                    }
                }.bind(this)} />
                {this.getContent()}
            </div>
        );
    }
}

export default App;
