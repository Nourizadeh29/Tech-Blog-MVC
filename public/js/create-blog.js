async function editFormHandler(event){
    event.preventDefault();
console.log('create blog')
    const title = document.querySelector('input[name="blog-title"]').value;
    const content = document.querySelector('textarea[name="blog-content"]').value;

    const response = await fetch(`/api/blogs`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok){
        document.location.replace('/dashboard/');
    }else {
        alert(response.statusText);
    }

}

document.querySelector('.new-blog-form').addEventListener('submit', editFormHandler)