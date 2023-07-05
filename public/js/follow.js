const followButton = document.getElementById("follow-button");
const unfollowButton = document.getElementById("unfollow-button");
const usersID = followButton.className;

console.log(usersID);


followButton.addEventListener("click", async () => {
    // const response = await fetch("/api/followers", {

    //     method: 'POST',
    //     body: JSON.stringify({ username, password }),
    //     headers: { 'Content-Type': 'application/json' },

    // })
})

unfollowButton.addEventListener("click", async () => {
    console.log("clicked");
})