#!/usr/bin/env python3

import argparse
import datetime
import json
import os
import requests
import sys


def getRanking(contest):
    API_URL_FMT = (
        "https://leetcode.com/contest/api/ranking/weekly-contest-{}/?pagination={}&region=global"
    )
    page = 30
    persistent_file = "src/views/91/db//weekly-{}.json".format(contest)
    total_rank = json.load(open(persistent_file, "r"))
    retry_cnt = 0
    while page < 31:
        try:
            url = API_URL_FMT.format(contest, page)
            resp = requests.get(url).json()
            page_rank = resp["total_rank"]
            if 0 == len(page_rank):
                break
            total_rank.extend(resp["total_rank"])
            print("Retrieved ranking from page {}. {} retrieved.".format(page, len(total_rank)))
            page += 1
            retry_cnt = 0
        except:
            print(f"Failed to retrieved data of page {page}...retry...{retry_cnt}")
            retry_cnt += 1

    # discard and transform fields
    for rank in total_rank:
        rank.pop("contest_id", None)
        rank.pop("user_slug", None)
        rank.pop("country_code", None)
        rank.pop("global_ranking", None)

    print("Save retrieved ranking to {}".format(persistent_file))
    with open(persistent_file, "w") as fp:
        json.dump(total_rank, fp)


def getContestInfo(contest):
    def unSlug(slug):
        return " ".join([w.capitalize() for w in slug.split("-")])

    def isNew(contests, newContest):
        for c in contests:
            if newContest["title"] == c["title"]:
                return False
        return True

    while True:
        try:
            CONTEST_INFO_API_URL_FMT = "https://leetcode.com/contest/api/info/weekly-contest-{}/"
            resp = requests.get(CONTEST_INFO_API_URL_FMT.format(contest)).json()
            startTimestamp = int(resp["contest"]["start_time"])
            break
        except:
            print("Failed to retrieved contest info...retry...")

    newContest = {"title": unSlug(contest), "slug": contest, "startTime": startTimestamp}
    contest_py = "src/views/91/db/contests-py.json"
    if os.path.exists(contest_py):
        with open(contest_py, "r") as fp:
            contests = json.load(fp)
    else:
        contests = []

    if isNew(contests, newContest):
        contests.append(newContest)
        contests.sort(key=lambda c: c["startTime"], reverse=True)

    with open(contest_py, "w+") as fp:
        json.dump(contests, fp)


def main():
    parser = argparse.ArgumentParser(description="Leetcode ranking crawler")
    parser.add_argument("contest", help="contest slug (ex: weekly-contest-178)")
    args = parser.parse_args()

    getRanking(args.contest)
    getContestInfo(args.contest)


if __name__ == "__main__":
    main()