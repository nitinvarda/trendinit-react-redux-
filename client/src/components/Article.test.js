import React from 'react'
import Article from './Article'

import { render, fireEvent, cleanup, screen } from '@testing-library/react'





afterEach(cleanup)

test('when data is sent through props to Article it should be shown in that component', async () => {

    const wrapper = render(<Article item={{ imagename: "547df8e93036f63144f3445e705a50fc.jpg", desc: "<p>adfasfadfasdfasdfsdafsa,  updated version</p>\n", title: " Tesla in talks with govt to set up research centre in Bengaluru." }} />)



    expect(wrapper.getByTestId('title').textContent).toBe(' Tesla in talks with govt to set up research centre in Bengaluru.')



})