import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Sort from './Sort'

const SortSection = () => {
    const [sortVisible, setSortVisible] = useState(false)
    useEffect(() => {
        function updateSort() {
            let box = document.getElementById('sort').getBoundingClientRect()
            let offsetElem=box.top + window.pageYOffset
            let scrollTop = window.pageYOffset
            if (scrollTop > offsetElem) {
                setSortVisible(true)
            } else {
                setSortVisible(false)
            }
        }

        window.addEventListener('scroll', updateSort);
        updateSort();
        return () => window.removeEventListener('scroll', updateSort);
    }, [])
    
    return (
        <section className={(sortVisible)?'fixed-sort show':'fixed-sort'}>
            <Container>
                <Sort />
            </Container>
        </section>
    );
};

export default SortSection;