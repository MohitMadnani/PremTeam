package com.pt.premier_team.player;

/** A nation code (ISO 3166 alpha-3, or ENG/SCO/WAL/NIR) and how many players are from it. */
public record NationInfo(String code, long players) {
}
