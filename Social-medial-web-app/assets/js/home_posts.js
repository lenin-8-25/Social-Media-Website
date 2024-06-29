{
    //method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url : '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost)); //populating delete link
                },error:function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

    //method to create a post using DOM
    let newPostDom = function(post){
        return $(`<li id="post-$(post._id)">
        <p>

            <small>
                <a class="delete-post-button"  href="/posts/destroy/${post._id}"><i class="material-icons" style="font-size:20px;color:red">delete</i></a>
            </small>
            <%}%>
            <small>
                ${post.user.name}
            </small>
                <div style="padding:10px;border: 1px solid gainsboro; margin: 5px;">
                    ${post.content}
                </div>
                <br>
    </p>
    <div class="post-comments">
        <form action="/comments/create" id="post-<%= post._id %>-comments-form" method="POST" class="comment-form">
            <input type="text" name="content" placeholder="Type Here to add comment..." required
                style="width:85%;border: none;outline: none;">
            <input type="hidden" name="post" value="${post._id}">
            <input type="submit" value="&#10148;">
        </form>

        <div class="post-comments-list">
            <ul id="post-comments-${post._id}">
          
            </ul>
        </div>
    </div>

</li>`)


    }

//method to delete a post from dom
let deletePost = function(deleteLink)
{
    $(deleteLink).click(function(e){
        e.preventDefault();

        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data){
                $('#post-${data.data.post_id}').remove();
                shownoty(data.flash);
            },error: function(error){
                console.log(error.responseText);
            }
        })
    })
}


    createPost();
    
}