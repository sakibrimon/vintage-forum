const discussionsContainer = document.getElementById('discussions-container');
const postsContainer = document.getElementById('posts-container');

const loadDiscussions = async (query = '') => {
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${query}`);
    const data = await response.json();
    const discussions = data.posts;
    console.log(discussions);
    displayDiscussions(discussions);
}

const displayDiscussions = discussions => {
    discussionsContainer.textContent = '';
    discussions.forEach((discussion, index) => {
        const discussionCard = document.createElement('div');
        discussionCard.classList = `p-10 flex min-h-[270px]# bg-[#797DFC1A]# bg-[#F3F3F5] rounded-3xl border# border-second# inter-font`;
        if (index > 0) {
            discussionCard.classList.add('mt-6'); 
        }
        discussionCard.innerHTML = `
            <div class="indicator">
                <span class="indicator-item badge ${discussion.isActive ? 'badge-success' : 'badge-error'}"></span>
                <img class="w-[72px] h-[72px] rounded-2xl" src="${discussion.image}" alt="">
            </div>
            <div class="ml-6 grow">
                <p class="font-medium text-sm text-[#12132DCC]">
                    <span># <span class="mr-5">${discussion.category}</span></span>Author : <span>${discussion.author.name}</span>
                </p>
                <h4 class="mt-3 font-bold text-xl text-prime mulish-font">${discussion.title}</h4>
                <p class="mt-4 pb-5 border-b border-dashed border-[#12132D40] text-[#12132D99]">${discussion.description}</p>
                <p class="mt-6 flex justify-between items-center">
                    <span class="flex items-center text-[#12132D99]">
                        <img src="images/comments.png" alt=""><span class="ml-4">${discussion.comment_count}</span>
                        <img class="ml-7" src="images/views.png" alt=""><span class="ml-4">${discussion.view_count.toLocaleString('en-US')}</span>
                        <img class="ml-7" src="images/times.png" alt=""><span class="ml-4">${discussion.posted_time}</span>
                        &nbsp;min
                    </span>
                    <img class="envelope cursor-pointer" src="images/envelope.png" alt="">
                </p>
            </div>
        `;
        discussionsContainer.appendChild(discussionCard);
    });

    const allEnvelopes = document.getElementsByClassName("envelope");
    const readContainer = document.getElementById('read-container');
    const readCount = document.getElementById('read-count');
    
    for (const envelope of allEnvelopes) {
        envelope.addEventListener("click", function (event) {
            for (const child of discussionsContainer.children) {
                child.classList.remove('bg-[#797DFC1A]', 'border', 'border-second');
                child.classList.add('bg-[#F3F3F5]');
            }
            const div = event.target.parentNode.parentNode.parentNode;
            div.classList.remove('bg-[#F3F3F5]');
            div.classList.add('bg-[#797DFC1A]', 'border', 'border-second');
            const discussionTitle = event.target.parentNode.parentNode.children[1].innerText;
            console.log(discussionTitle);
            const discussionViewCount = event.target.parentNode.children[0].children[3].innerText;
            console.log(discussionViewCount);
            const readCard = document.createElement('div');
            readCard.classList = `mt-4 p-4 bg-white rounded-2xl flex justify-between items-center`;
            readCard.innerHTML = `
                <div class="w-[65%] font-semibold text-prime">
                    <span>${discussionTitle}</span>
                </div>
                <div class="flex items-center text-[#12132D99]">
                    <img src="images/views.png" alt=""><span class="ml-2">${discussionViewCount}</span>
                </div>
            `;
            readContainer.appendChild(readCard);
            let value = parseInt(readCount.innerText);
            value++;
            readCount.innerText = value;
        });
    }

}

loadDiscussions();

const loadPosts = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
    const data = await response.json();
    const posts = data;
    console.log(posts);
    displayPosts(posts);
}

const displayPosts = posts => {
    posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.classList = `lg:w-[32%] p-6 min-h-[482px]# border border-[#12132D26] rounded-3xl`;
        postCard.innerHTML = `
            <img class="rounded-[20px]" src="${post.cover_image}" alt="">
                    <p class="mt-6 flex items-center text-[#12132D99]"><img class="mr-2" src="images/calendar.png" alt=""><span>${post.author.posted_date ? post.author.posted_date : 'No published date'}</span></p>
                    <h5 class="mt-4 font-extrabold text-lg text-prime inter-font">${post.title}</h5>
                    <p class="mt-3 text-[#12132D99]">${post.description}</p>
                    <div class="mt-4 flex items-center">
                        <img class="w-11 h-11 rounded-full" src="${post.profile_image}" alt="">
                        <div class="ml-4">
                            <h6 class="font-bold text-prime">${post.author.name}</h6>
                            <p class="text-sm text-[#12132D99]">${post.author.designation ? post.author.designation : 'Unknown'}</p>
                        </div>
                    </div>
        `;
        postsContainer.appendChild(postCard);
    })
}

loadPosts();

const handleSearch = () => {
    const searchField = document.getElementById('search-field');
    const searchedText = searchField.value;
    console.log(searchedText);
    loadDiscussions(`?category=${searchedText}`);
}




