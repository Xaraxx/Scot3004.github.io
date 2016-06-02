---
title: Contribuciones
class: text-center
pid: contribuciones
---
{% assign sorted_repos = (site.github.public_repositories | sort: 'stargazers_count') | reverse | where: "fork", "false" %}

<div class="repo-list row">
    <!-- Check here for github metadata -->
    <!-- https://help.github.com/articles/repository-metadata-on-github-pages/ -->
    {% for repo in sorted_repos %}
    <div class="col-md-4 card text-center">
        <div class="thumbnail">
            <div class="card-image geopattern" data-pattern-id="{{ repo.name }}">
                <div class="card-image-cell">
                    <h3 class="card-title">
                        <a href="{{ repo.html_url }}" target="_blank">{{ repo.name }}</a>
                    </h3>
                </div>
            </div>
            <div class="caption">
                <div class="card-description">
                    <p class="card-text">{{ repo.description }}</p>
                </div>
                <div class="card-text">
                    {% comment %}
                    <span data-toggle="tooltip" class="meta-info" title="{{ repo.stargazers_count }} stars">
                        <span class="octicon octicon-star"></span> {{ repo.stargazers_count }}
                    </span>
                    <span data-toggle="tooltip" class="meta-info" title="{{ repo.forks_count }} forks">
                        <span class="octicon octicon-git-branch"></span> {{ repo.forks_count }}
                    </span>
                    {%  endcomment %}
                    <span data-toggle="tooltip" class="meta-info" title="Actualizado：{{ repo.updated_at }}">
                        <span class="octicon octicon-clock"></span>
                        <time datetime="{{ repo.updated_at }}" title="{{ repo.updated_at }}">{{ repo.updated_at | date: '%Y-%m-%d' }}</time>
                    </span>
                </div>
            </div>
        </div>
    </div>
    {% endfor %}
</div>

<script>
    $(document).ready(function(){
        // Enable bootstrap tooltip
        $("body").tooltip({ selector: '[data-toggle=tooltip]' });
        $('.geopattern').each(function(){
            $(this).geopattern($(this).data('pattern-id'));
        });
    });
</script>