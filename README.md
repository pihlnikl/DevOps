# Course project – personal report

Niklas Pihl

Github repo: [https://github.com/pihlnikl/DevOps](https://github.com/pihlnikl/DevOps)

This course gave some good insights into the world of DevOps, as well as some good insight into AWS products. One thing I learned especially well, which was crucial to finishing this project, was to read the user manuals and tutorials for each AWS product used very meticulously. I found that no matter the problem, AWS has a tutorial which explains the problem and offers a solution.

The only exception to this was the automated tests, which I found to be the hardest part. Because of this I decided to only implement one test, since it was the only one I could get to work. The slack bot I created is largely the same as the example given in the project specs. And so, what my test does is it tests to see if the database behind the /knowledge function is a valid JSON file.

The project itself is meant to expand on the slack bot example provided. I figured I would keep the /knowledge and /update functions, and instead focus on the back-end by adding some helpful functions. I added a manual approval stage for any updates in the code, mainly with the intention of requiring manual approval if someone wants to add or remove things from the slack bots database of answers.

All codes and screenshots can be found in the above-mentioned repo, since they can be more easily checked there.

Project in action

![alt text](https://https://github.com/pihlnikl/DevOps/tree/main/pihlnikl-slack-bot/Screenshots/CodePipeline_screenshot.PNG?raw=true)

1. When something is pushed to the corresponding github repo, a code pipeline is started. The pipeline then needs a manual approval before the new push is sent to codebuild and built.

![alt text](https://https://github.com/pihlnikl/DevOps/tree/main/pihlnikl-slack-bot/Screenshots/request_approval_lambda.PNG?raw=true)

1. A lambda function called Request-approval is used to send this manual approval request as a message from the slack bot. API gateway and an SNS subscription is used for this. (I added the lambda handlers to my github since it&#39;s more convenient than taking screenshot of them.)

![alt text](https://https://github.com/pihlnikl/DevOps/tree/main/pihlnikl-slack-bot/Screenshots/SNS_screenshot.png?raw=true)

1. 2 Lambda functions are added as subscribers to the SNS topic. One function is for sending the approval request, the second is to send a message on the build status (SUCCEEDED, STOPPED, FAILED etc.). It probably would have been possible to combine these functions into a single lambda function, but that would only have been extra work for my part, and since this solution works perfectly fine anyway I decided to not do the extra work :).

![alt text](https://https://github.com/pihlnikl/DevOps/tree/main/pihlnikl-slack-bot/Screenshots/slackBot_lambda_screenshot.PNG?raw=true)

1. The lambda responsible for writing the build status. This lambdas handler is also available for checking in my github repo.

![alt text](https://https://github.com/pihlnikl/DevOps/tree/main/pihlnikl-slack-bot/Screenshots/slack_screenshot.PNG?raw=true)

1. The slack bot in action. First message is asking for approval to build the latest push and links to the code pipeline. Second message is the build status (in this case it succeeded). My initial idea was to have an approve- and a disapprove button in slack which would send the corresponding payload to the pipeline, but I couldn&#39;t get this to work with slacks new app manifest system.

![alt text](https://https://github.com/pihlnikl/DevOps/tree/main/pihlnikl-slack-bot/Screenshots/CodeBuild_screenshot.PNG?raw=true)

1. And lastly the codebuild itself which starts on approval. Artifacts are sent to an S3 bucket and the github repo can be seen in source.
