import React from 'react';
import './Article.css'
import { Card, CardImg } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import '../components/Homepage/mainpage/Homepage.css';
const Article = ({ item }) => {
    return (
        <Card className="recent-articles">
            <CardImg className="article-img" variant="top" src={"/image/" + item.imagename} fluid='true' height="230px" />
            <Card.Body>
                <Card.Title data-testid='title'>{item.title}</Card.Title>
                <ReactMarkdown className="article-desc card-text" data-testid='desc' source={item.desc} escapeHtml={false} />
            </Card.Body>

        </Card>
    );
}

export default Article;
