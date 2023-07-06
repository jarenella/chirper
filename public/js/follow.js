const followButton = document.getElementById("follow-button");
const unfollowButton = document.getElementById("unfollow-button");
const profileID = followButton.className;
const loggedInUserID = unfollowButton.className;

console.log(profileID);


followButton.addEventListener("click", async () => {
    const data = {
        following_user_id: loggedInUserID,
        followed_user_id: profileID,
    };
    
    const response = await fetch("/api/followers", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    })

    console.log("Follow response: " + response);
})

unfollowButton.addEventListener("click", async () => {
    const response = await fetch(`/api/followers/${profileID}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })

    console.log("Unfollow response: " + response);
})