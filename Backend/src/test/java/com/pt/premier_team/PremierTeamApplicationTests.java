package com.pt.premier_team;

import com.pt.premier_team.player.Player;
import com.pt.premier_team.player.PlayerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class PremierTeamApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private PlayerRepository repository;

    @BeforeEach
    void seed() {
        repository.deleteAll();
        repository.save(new Player("1-1-2026-27", "David Raya", "ESP", "GK", 31, 8, 8, 720, 0, 0, 0, 0, 0, 0.0, 0.01, "Arsenal", 3, "2026-27", 154561, 6.2, 49, "d", "Knock - 75% chance of playing"));
        repository.save(new Player("2-2-2026-27", "Erling Haaland", "NOR", "FW", 26, 8, 8, 700, 9, 1, 0, 1, 0, 6.09, 0.5, "Man City", 43, "2026-27", 223094, 15.8, 66, "a", null));
    }

    @Test
    void filtersByTeam() throws Exception {
        mockMvc.perform(get("/api/v1/player").param("team", "Arsenal"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].name").value("David Raya"));
    }

    @Test
    void exposesFantasyFields() throws Exception {
        mockMvc.perform(get("/api/v1/player").param("name", "raya"))
                .andExpect(jsonPath("$[0].playerCode").value(154561))
                .andExpect(jsonPath("$[0].price").value(6.2))
                .andExpect(jsonPath("$[0].points").value(49))
                .andExpect(jsonPath("$[0].status").value("d"))
                .andExpect(jsonPath("$[0].news").value("Knock - 75% chance of playing"));
    }

    @Test
    void searchesByNameIgnoringCase() throws Exception {
        mockMvc.perform(get("/api/v1/player").param("name", "haaland"))
                .andExpect(jsonPath("$[0].team").value("Man City"));
    }

    @Test
    void listsTeamsWithBadgeCodes() throws Exception {
        mockMvc.perform(get("/api/v1/player/teams"))
                .andExpect(jsonPath("$[0].name").value("Arsenal"))
                .andExpect(jsonPath("$[0].code").value(3));
    }

    @Test
    void filtersByExactNation() throws Exception {
        mockMvc.perform(get("/api/v1/player").param("nation", "nor"))
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].name").value("Erling Haaland"));
    }

    @Test
    void listsNationsWithPlayerCounts() throws Exception {
        mockMvc.perform(get("/api/v1/player/nations"))
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].players").value(1));
    }

    @Test
    void returnsEveryoneWithoutFilters() throws Exception {
        mockMvc.perform(get("/api/v1/player"))
                .andExpect(jsonPath("$.length()").value(2));
    }
}
