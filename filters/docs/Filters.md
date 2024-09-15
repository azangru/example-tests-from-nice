# Front End Technical Brief - Filters

We ask all engineers to provide a solution to a short brief as part of our recruitment process at NICE. It's a great way for us to assess your technical abilities and help us understand the way you think about your development work.

We'll anonymously review your solution before the interview then we'll discuss your approach, code and tests during the interview.

We look for a number of things when we're reviewing, including:

- Specific front-end coding skills
- Understanding of aspects such as accessibility, progressive enhancement, and performance
- Your choice of tooling and use of external libraries where appropriate
- How you structure an application.

---

## Your Submission

The details of the [the brief](#the-brief) are below but _please_:

- Provide your solution in **HTML, CSS and React**
- Don't spend more than ~4 hours
- Write some tests for what you feel is the most important part of your solution
- Feel free to use NPM packages where appropriate.

_We're looking for a real-world solution to the brief, not an academic ideal._

You won't have time to complete everything, but **that's OK**!

We're more interested in your approach, thought process, application structure and where you stop, than a complete solution. For example what you prioritise or where you write tests and where you don't. We can discuss where you might go next with your solution in the interview.

**Please submit your solution by sending us a link to a git repo we can access publically. Github, Gitlab or Bitbucket are fine, as long as we can access your codebase.**

---

## The Brief

Being a front-end developer often means loading data from an API. One such API example is our 'search backend' that provides search results from elasticsearch. There's a file in this folder called [_search-data.json_](search-data.json) which contains a snapshot of data from the our search API. The data is a list of guidance and advice, with various properties.

Use the data from _search-data.json_ to build an interface that:

- displays 10 results per page, each record showing at least the `title` and `lastUpdated`
- can filter by at least one of `niceDocType`, `niceAdviceType` or `niceGuidanceType`. Hint: look at the `navigators` property to help you.
- is fully usable with a keyboard and ideally usable with a sceenreader.

### Tips

- Don't focus too much on how it looks. We value usability and accessibility over pure aesthetics for the purposes of the test.
- Pull in any libraries or supporting packages to speed up your development.
- Just do what you can. We appreciate that people are busy and unpaid work like this can be an inconvenience. We're not looking for an app to ship, we're just looking:
  - to get an insight to the way you think
  - how you approach creating a solution
  - and how you speak about and understand your work.
