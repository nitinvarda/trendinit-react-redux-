import React from 'react';
import './Article.css'
import { Card, CardImg } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import '../components/Homepage/mainpage/Homepage.css';
const Article = ({ item }) => {
    return (
        <Card className="recent-articles">
            <CardImg variant="top" src={"/image/" + item.imagename} fluid height="230px" />
            <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text className="article-desc"><ReactMarkdown source={item.desc} escapeHtml={false} /></Card.Text>
            </Card.Body>

        </Card>
    );
}

export default Article;
