package com.klef.temple.service;

import java.util.List;
import com.klef.temple.model.Temple;

public interface TempleService {
    Temple addTemple(Temple temple);
    List<Temple> getAllTemples();
    Temple getTempleById(int id);
    Temple updateTemple(Temple temple);
    void deleteTempleById(int id);
}
