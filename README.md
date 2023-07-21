# React Mini Modal <!-- omit in toc -->

React Mini Modal is a minimalist and easy-to-style modal component for React.

## My Table of Content <!-- omit in toc -->

- [Installation](#installation)
- [Minimal Basic Usage](#minimal-basic-usage)
- [Modal Props](#modal-props)
- [Example with Button Component](#example-with-button-component)
- [Button Props](#button-props)
- [Advanced Styling](#advanced-styling)
  - [CSS Class Description](#css-class-description)
  - [DOM Structure](#dom-structure)

## Installation

You can install the `react-mini-modal` package using npm:

```bash
npm install react-mini-modal
```

## Minimal Basic Usage

Import `Modal` in your React component:

```jsx
import Modal from 'react-mini-modal';
```

Implement `Modal` in your React component:

```jsx
function MyComponent() {
  const [open, setOpen] = useState(false)

  return (
    <div>
        <button onClick={() => setOpen(!open)}>Open Modal</button>

        <Modal
          content="Here is your modal's content"
          open={open}
          onClose={() => setOpen(false)}
        />
      </div>
  )
}
```

In the above example, the `Modal` component is rendered with only the required props such as `content`, `open`, and `onClose`.

## Modal Props

The `Modal` component offers some more props to facilitate is styling:

| Prop | Type | Description | Required | Default Value |
| ---- | ---- | ----------- | -------- | ------------- |
| title  | string  | The title of the modal. | No | - |
| content  | string  | The content of the modal. | Yes | - |
| height  | string  | The height of the modal. | No | - |
| width  | string  | The width of the modal.  | No | - |
| color  | string  | The color of the modal text. | No | "#6b7280" |
| footerButton  | JSX.Element  | A custom button component for the modal footer.  | Yes | - |
| backgroundColor  | string  | The background color of the modal. | No | "#fff" |
| open  | boolean | Boolean indicating whether the modal is open or closed.  | Yes | false |
| onClose  | () => void  | Callback function to be called when the modal is closed. | Yes | - |

## Example with Button Component

The `Modal` component is distributed with a minimalist `Button` component to facilitate the addition of a `footerButton` if needed. Here's a example including it :

Import `Button` in your React component:

```jsx
import Button from 'react-mini-modal';
```

Implement `Button` as the `footerButton` prop value of your `Modal` component:

```jsx
function MyComponent() {
  const [open, setOpen] = useState(false)

  return (
    <div>
        <button onClick={() => setOpen(!open)}>Open Modal</button>

        <Modal
          content="Here is your modal's content"
          footerButton={<Button onClick={() => setOpen(false)} content="This button close the modal" />}
          open={open}
          onClose={() => setOpen(false)}
        />
      </div>
  )
}
```

## Button Props

The `Button` component require only two props:

| Prop    | Type               | Description                             | Required |
| ------- | ------------------ | --------------------------------------- | -------- |
| content | string             | The text content of the button.         | Yes      |
| onClick | () => void         | Callback function for click event.      | Yes      |

## Advanced Styling

Aside from using the provided styling props such as `color`, `width` or `backgroundColor`, the appearance of the `Modal` component can be customized using CSS classes. Here's the available BEM's CSS classes :

### CSS Class Description

| Class<div style="width:150px"></div>| Description    |
| ----------------------------------- | -------------- |
|`.modal__background`            | Styles the background overlay of the modal window. By default, it sets the coverage on the entire viewport and applies a blurry effect.|
| `.modal__wrapper`              | Styles the modal wrapper element. By default, it positions the modal at the center of the screen and applies a box shadow.|
| `.modal`                       | Styles the modal content container. By default, it sets the gap between elements and the font styling.|
| `.modal__header`               | Styles the header of the modal. By default, it provided an empty space to displays the `title`.|
| `.modal__title`                | Styles the title of the modal. By default, it's applied on a `h2`.|
| `.modal__body`                 | Styles the body of the modal. By default, it provided an empty space to displays the `content`.|
| `.modal__content`              | Styles the content of the modal. By default, it's applied on a `p`.|
| `.modal__footer`               | Styles the footer of the modal. By default, it provided an empty space to displays buttons or elements added through the `footerButton` prop.|
| `.modal__btn`                  | Styles this library `Button` component.|
| `.modal__btn--close`           | Styles the close button icon. By default, it positions the icon at the top right corner of the modal.|

### DOM Structure

```jsx
<!-- Background Page Covering/Blurrying -->
<div className='modal__background'>
            <div className='modal__wrapper'>
            <div className='modal'>
                <!-- Close Icon -->
                <button className='modal__btn modal__btn--close' />

                <!-- Header with Title -->
                <div className="modal__header">
                    <h2 className="modal__title" />
                </div>

                <!-- Body with Content -->
                <div className="modal__body">
                    <p className="modal__content" />
                </div>

                <!-- Footer with footerButton -->
                <div className="modal__footer">
                    <button className='modal__btn' />
                </div>
            </div>
        </div>
    </div>
```